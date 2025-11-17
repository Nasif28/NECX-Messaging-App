import { useEffect, useState, useRef } from "react";
import "./App.css";

const API_BASE = "http://localhost:3001/api";

function App() {
  const [healthStatus, setHealthStatus] = useState("Checking...");
  const [personas, setPersonas] = useState([]);
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [currentPersona, setCurrentPersona] = useState("");
  const [newPersonaName, setNewPersonaName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [importFile, setImportFile] = useState(null);
  const chatRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // Check backend health
  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then((res) => res.json())
      .then((data) => setHealthStatus(data.status))
      .catch(() => setHealthStatus("Error"));
  }, []);

  // Load personas and messages
  useEffect(() => {
    loadPersonas();
    loadMessages();
  }, []);

  useEffect(() => {
    setFilteredMessages(
      messages.filter((msg) =>
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    scrollToBottom();
  }, [messages, searchQuery]);

  const loadPersonas = async () => {
    try {
      const res = await fetch(`${API_BASE}/personas`);
      const data = await res.json();
      setPersonas(data);
      if (data.length > 0 && !currentPersona) {
        setCurrentPersona(data[0].id);
      }
    } catch (err) {
      alert("Error loading personas");
    }
  };

  const loadMessages = async () => {
    try {
      const res = await fetch(`${API_BASE}/messages`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      alert("Error loading messages");
    }
  };

  const createPersona = async () => {
    if (!newPersonaName.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/personas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newPersonaName }),
      });
      if (!res.ok) throw new Error();
      const newPersona = await res.json();
      setPersonas([...personas, newPersona]);
      setCurrentPersona(newPersona.id);
      setNewPersonaName("");
    } catch (err) {
      alert("Error creating persona");
    }
  };

  const sendMessage = async () => {
    if (!currentPersona || !messageText.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId: currentPersona, text: messageText }),
      });
      if (!res.ok) throw new Error();
      const newMsg = await res.json();
      setMessages([...messages, newMsg]);
      setMessageText("");
      scrollToBottom();
    } catch (err) {
      alert("Error sending message");
    }
  };

  const updateMessage = async (id) => {
    if (!editText.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      });
      if (!res.ok) throw new Error();
      const updatedMsg = await res.json();
      setMessages(messages.map((m) => (m.id === id ? updatedMsg : m)));
      setEditingId(null);
      setEditText("");
    } catch (err) {
      alert("Error updating message");
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`${API_BASE}/messages/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setMessages(messages.filter((m) => m.id !== id));
    } catch (err) {
      alert("Error deleting message");
    }
  };

  const startEdit = (msg) => {
    setEditingId(msg.id);
    setEditText(msg.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const exportData = async () => {
    try {
      const res = await fetch(`${API_BASE}/export`);
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "necx-data.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error exporting data");
    }
  };

  const importData = async () => {
    if (!importFile) return;
    const formData = new FormData();
    formData.append("file", importFile);
    try {
      const res = await fetch(`${API_BASE}/import`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error();
      alert("Data imported successfully");
      loadPersonas();
      loadMessages();
      setImportFile(null);
    } catch (err) {
      alert("Error importing data");
    }
  };

  const getPersonaName = (id) =>
    personas.find((p) => p.id === id)?.name || "Unknown";
  const isCurrentSender = (senderId) => senderId === currentPersona;

  const handleMessageClick = (msg) => {
    if (editingId !== msg.id) startEdit(msg);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>NECX Messaging</h1>
        {/* <div className="health-check">
          Backend Health:{" "}
          <span className={healthStatus === "OK" ? "healthy" : "unhealthy"}>
            {healthStatus}
          </span>
        </div> */}
        <section className="persona-section">
          <p>Sender</p>
          <select
            value={currentPersona}
            onChange={(e) => setCurrentPersona(e.target.value)}
          >
            {personas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="New persona name"
            value={newPersonaName}
            onChange={(e) => setNewPersonaName(e.target.value)}
          />
          <button onClick={createPersona}>Create</button>
        </section>

        <div className="top-tools">
          <button onClick={exportData}>⬇️ Export</button>

          <label className="upload-btn">
            ⬆️ Import
            <input
              type="file"
              accept=".json"
              onChange={(e) => setImportFile(e.target.files[0])}
            />
          </label>

          <button onClick={importData} disabled={!importFile}>
            Upload
          </button>
        </div>
      </header>

      <section className="search-section">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <section className="chat-area" ref={chatRef}>
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              isCurrentSender(msg.senderId) ? "right" : "left"
            }`}
          >
            <div className="bubble">
              {editingId === msg.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && updateMessage(msg.id)}
                  autoFocus
                />
              ) : (
                <span className="text">{msg.text}</span>
              )}

              <div
                className={`meta-row ${
                  isCurrentSender(msg.senderId) ? "right" : "left"
                }`}
              >
                {
                  <span className="sender">
                    {getPersonaName(msg.senderId)} - {" "}
                  </span>
                }

                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
            <div className="actions">
              {editingId !== msg.id && (
                <button onClick={() => startEdit(msg)}>✏️</button>
              )}
              <button onClick={() => deleteMessage(msg.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </section>

      <section className="input-wrapper">
        <div className="input-bubble">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
        </div>
        <button onClick={sendMessage}>Send</button>
      </section>
    </div>
  );
}

export default App;
