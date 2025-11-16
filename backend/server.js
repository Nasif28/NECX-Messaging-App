import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";
import multer from "multer";

// Fix __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

const DATA_FILE = path.join(__dirname, "data.json");

// Middleware
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" }); // Temp dir for imports

// Initialize data file if not exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ personas: [], messages: [] }));
}

// Load data
const loadData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const saveData = (data) =>
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Get all personas
app.get("/api/personas", (req, res) => {
  const data = loadData();
  res.json(data.personas);
});

// Create new persona
app.post("/api/personas", (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Invalid name" });
  }
  const data = loadData();
  const newPersona = { id: uuid.v4(), name: name.trim() };
  data.personas.push(newPersona);
  saveData(data);
  res.status(201).json(newPersona);
});

// Get all messages (sorted by timestamp)
app.get("/api/messages", (req, res) => {
  const data = loadData();
  const sortedMessages = data.messages.sort(
    (a, b) => a.timestamp - b.timestamp
  );
  res.json(sortedMessages);
});

// Send new message
app.post("/api/messages", (req, res) => {
  const { senderId, text } = req.body;
  if (!senderId || !text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ error: "Invalid senderId or text" });
  }
  const data = loadData();
  const personaExists = data.personas.some((p) => p.id === senderId);
  if (!personaExists) {
    return res.status(400).json({ error: "Persona not found" });
  }
  const newMessage = {
    id: uuid.v4(),
    senderId,
    text: text.trim(),
    timestamp: Date.now(),
  };
  data.messages.push(newMessage);
  saveData(data);
  res.status(201).json(newMessage);
});

// Update message (edit)
app.put("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ error: "Invalid text" });
  }
  const data = loadData();
  const messageIndex = data.messages.findIndex((m) => m.id === id);
  if (messageIndex === -1) {
    return res.status(404).json({ error: "Message not found" });
  }
  data.messages[messageIndex].text = text.trim();
  saveData(data);
  res.json(data.messages[messageIndex]);
});

// Delete message
app.delete("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  const data = loadData();
  const messageIndex = data.messages.findIndex((m) => m.id === id);
  if (messageIndex === -1) {
    return res.status(404).json({ error: "Message not found" });
  }
  data.messages.splice(messageIndex, 1);
  saveData(data);
  res.json({ success: true });
});

// Export data
app.get("/api/export", (req, res) => {
  const data = loadData();
  res.json(data);
});

// Import data (replace)
app.post("/api/import", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    const importedData = JSON.parse(fs.readFileSync(req.file.path));
    if (!importedData.personas || !importedData.messages) {
      return res.status(400).json({ error: "Invalid data format" });
    }
    saveData(importedData);
    fs.unlinkSync(req.file.path); // Clean up temp file
    res.json({ success: true });
  } catch (err) {
    fs.unlinkSync(req.file.path);
    res.status(400).json({ error: "Invalid JSON" });
  }
});

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
