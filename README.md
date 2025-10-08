# NECX Messaging App - Take-Home Interview Project

## 📋 Project Overview

**Time Allocation:** 3-6 hours  
**Tech Stack:** React + Express.js + Node.js
**The project must be submitted by [DEADLINE DATE] at 11:59 PM EST.**

### What You'll Build

Create a personal messaging application where you can send messages to yourself. Think of it as a personal note-taking or journaling app with a chat-like interface. While you can create different user personas/names, this is designed as a single-user application for personal use.

This project allows you to demonstrate:

- Full-stack application architecture and design decisions
- RESTful API implementation
- React user interface development
- Data persistence and management
- Error handling and user experience design

---

## 🎨 Design Requirements

### Figma Reference

**Design File:** [https://www.figma.com/design/afV98h5H455Pmx1ZqlNgbM/Messaging-App?node-id=0-1&t=Vxg3yWBGBtbMmmde-1](https://www.figma.com/design/afV98h5H455Pmx1ZqlNgbM/Messaging-App?node-id=0-1&t=Vxg3yWBGBtbMmmde-1)

### Visual Specifications

- **Theme:** Dark mode interface
- **Color Palette:** Navy/dark blue backgrounds with green accents
- **Typography:** System fonts, clean and modern
- **Layout:** Single-page application with header, chat area, and input section

### UI Components

Build the interface components you think are necessary for a personal messaging application. Consider what would make for an intuitive and pleasant user experience.

---

## 🛠️ Technical Requirements

### Backend Implementation

Build an Express.js API server that can handle message and user data. Design your own:

- API endpoints and routes
- Data models and validation
- Data persistence strategy
- Error handling approach

### Frontend Implementation

Create additional React components and features for your messaging app. Build upon the provided foundation:

- Expand the component architecture beyond the basic health check
- Implement state management for messages and users
- Enhance the user interface design and user experience
- Integrate with your expanded backend API

---

## 📁 Project Structure

```
necx-messaging-take-home/
├── package.json                 # Root dependencies and scripts
├── backend/
│   ├── package.json            # Backend dependencies (Express, CORS, Nodemon)
│   └── server.js               # Express server with health check endpoint
├── frontend/
│   ├── package.json            # Frontend dependencies (React, Vite)
│   ├── index.html              # HTML template
│   ├── vite.config.js          # Vite configuration
│   └── src/
│       ├── main.jsx            # React app entry point
│       ├── App.jsx             # Main app component with health check
│       ├── App.css             # App styling (dark theme)
│       └── index.css           # Global styles
└── README.md                   # This file
```

**Provided:** Basic Express server, React app foundation, health check integration, and development environment setup.

**Your Task:** Build the messaging features on top of this foundation!

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation & Setup

```bash
# Install all dependencies
npm install

# Start development servers (both frontend and backend)
npm run dev

# Or start them individually:
npm run dev:backend  # Express server on port 3001
npm run dev:frontend # React app on port 5173
```

### What's Already Set Up

✅ **Express Server** (`/backend/server.js`)

- Basic Express.js server with CORS and JSON middleware
- Health check endpoint at `GET /api/health`
- Running on port 3001

✅ **React Application** (`/frontend/src/`)

- Vite-powered React app with health check integration
- Dark theme styled to match design requirements
- Backend connectivity test on startup
- Running on port 5173

✅ **Development Environment**

- Concurrent frontend/backend development
- ES Modules support throughout
- Hot reload for both servers

### First Steps

1. **Verify Setup**: Run `npm run dev` and visit <http://localhost:5173>
2. **Check Backend**: You should see a green "OK" status in the health check
3. **Start Building**: Add your messaging features to both frontend and backend!

### Application URLs

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3001
```

### Implementation Setup

**Backend Setup:**

1. Create your Express server entry point (e.g., `backend/index.js` or `backend/server.js`)
2. Implement your API endpoints and data handling
3. Ensure your server runs on port 4000

**Frontend Setup:**

1. Create your React application in `frontend/src/`
2. Create your entry point (e.g., `src/main.jsx` or `src/index.js`)
3. Implement your components and UI
4. Ensure your app builds and runs with Vite

### Verify Setup

- After implementing your backend: Visit `http://localhost:4000/health` or your health check endpoint
- After implementing your frontend: Visit `http://localhost:5173` to see your React application

---

## 📋 Core Requirements

Build a functional personal messaging application with the following capabilities:

### Essential Functionality

**Messaging System:**

- Send and store messages
- Display message history
- Support for different user personas/names (even though it's single-user)

**User Management:**

- Create different user personas
- Select which persona is sending a message

**Data Persistence:**

- Messages and users persist between sessions
- Choose your preferred storage method

**User Interface:**

- Clean, intuitive messaging interface
- Match the general design aesthetic shown in the provided designs
- Responsive and user-friendly experience

### Technical Implementation

**Backend:**

- Express.js server running on port 4000
- RESTful API design
- Proper error handling and validation
- Data persistence strategy

**Frontend:**

- React application running on port 5173
- Component-based architecture
- State management for messages and users
- Integration with backend API

### Development Requirements

- Application should run with `npm run dev`
- Both frontend and backend should start concurrently
- Code should be clean, readable, and well-organized
- Basic error handling for user-facing issues

---

## 🌟 Optional Enhancements

If you complete the core functionality early, consider adding features that showcase your skills:

### Possible Enhancements

- Advanced message features (editing, deletion, search)
- Real-time updates or auto-refresh
- Better user experience and interface polish
- Data export/import capabilities
- Message categories or tags
- Improved accessibility features
- Performance optimizations
- Additional validation and error handling
- Testing implementation

Choose enhancements that align with your strengths and interests!

---

- **Creativity** - Thoughtful improvements beyond requirements
- **Performance** - Efficient API calls, optimized rendering
- **Testing** - Unit tests or integration tests
- **Documentation** - Clear code comments, API documentation

---

## 📤 Submission Guidelines

### What to Submit

1. **Complete Codebase** - All source code in a ZIP file or GitHub repository
2. **README Updates** - Document any setup instructions or design decisions
3. **Demo Video** - Screen recording showing functionality

### Submission Format

- **ZIP File** - Include all source code except node_modules with demo video

### Documentation Required

- **Setup Instructions** - Any additional steps needed to run your code
- **Design Decisions** - Brief explanation of technical choices made
- **Known Issues** - Any limitations or bugs in your implementation
- **Future Improvements** - What you would add with more time

---

## 🤝 Support

### Questions During Development

- **Technical Issues** - Email: [your-contact-email]

### Resources

- **Design Reference** - [Link to Figma file]

---

## 🏁 Final Notes

This project is designed to showcase your full-stack development skills by building a complete application from scratch. You have complete freedom in how you structure and implement your solution, as long as you use React for the frontend and Express.js for the backend.

**Implementation Freedom:**

- **Architecture Decisions:** Choose your own project structure and file organization
- **Data Storage:** Use JSON files, in-memory storage, or a database of your choice
- **Styling Approach:** CSS, styled-components, CSS modules, or any styling solution
- **State Management:** React hooks, Context API, or external libraries
- **Additional Libraries:** Add any npm packages you find helpful

Focus on delivering working functionality first, then enhance with polish and additional features if time permits.

Good luck, and we look forward to seeing your implementation!

---

_This take-home project is part of NECX's interview process. Please do not share this document or your solution publicly._
