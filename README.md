# Real-time Chat

A full-stack real-time chat application that allows users to communicate through instant messaging.

The project uses **NestJS** for the backend, **MongoDB** for data storage, and **WebSocket** for real-time communication.

## 📌 Overview

The application follows a **Frontend – Backend – Database** architecture.

```text
┌─────────────────┐
│    Frontend     │
│      React      │
└────────┬────────┘
         │
         │ HTTP / REST API
         │
         ▼
┌─────────────────┐
│     Backend     │
│     NestJS      │
│                 │
│  REST API       │
│  WebSocket      │
└───────┬─────────┘
        │
        ▼
┌─────────────────┐
│    Database     │
│    MongoDB      │
└─────────────────┘
```

For real-time messaging, the client establishes a WebSocket connection with the backend.

```text
User A
  │
  │ WebSocket
  ▼
NestJS WebSocket Gateway
  │
  │ Real-time message
  ▼
User B
```

## ✨ Features

### User

* User registration and login
* User authentication
* View users / friends
* Start a conversation
* View conversation history

### Real-time Messaging

* Send messages in real time
* Receive messages instantly
* Store messages in MongoDB
* Load previous messages
* Display conversation history

## 🛠️ Technologies

### Frontend

* React
* React Router
* HTML
* CSS
* Tailwind CSS

### Backend

* Node.js
* NestJS
* REST API
* WebSocket
* Socket.IO

### Database

* MongoDB
* Mongoose

### Development Tools

* Git
* GitHub
* Postman
* Visual Studio Code

## 📂 Project Structure

```text
real-time-chat/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── chat/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   └── ...
│   ├── package.json
│   └── ...
│
└── README.md
```

### `backend/`

Contains the NestJS application, including:

* REST API
* Authentication
* User management
* Chat management
* WebSocket Gateway
* Message handling
* MongoDB integration

### `frontend/`

Contains the React application, including:

* Chat interface
* User / friend list
* Conversation view
* Message components
* WebSocket client
* API integration

## 🗄️ Database

The application uses **MongoDB** to store users, conversations, and messages.

Example data relationship:

```text
User
 │
 ├──────────────┐
 │              │
 ▼              ▼
Conversation   Conversation
 │
 ▼
Message
 │
 ├── sender
 ├── receiver
 ├── content
 └── createdAt
```

A message contains information about the sender, receiver, message content, and creation time.

## 🔄 Real-time Communication

The application uses **WebSocket** to provide real-time communication between clients.

The general message flow is:

```text
User A
  │
  │ 1. Send message
  ▼
Frontend
  │
  │ WebSocket
  ▼
NestJS WebSocket Gateway
  │
  ├──────────────► Save message to MongoDB
  │
  │
  └──────────────► Emit message
                         │
                         ▼
                    User B
                         │
                         ▼
                  Display message
```

Unlike a traditional HTTP request, the WebSocket connection remains open, allowing the server to push new messages to connected clients immediately.

## 📡 REST API

REST APIs are used for operations such as authentication, user management, and retrieving chat history.

### Authentication

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | User login          |

### Users

| Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| GET    | `/users`      | Get users            |
| GET    | `/users/{id}` | Get user information |

### Messages

| Method | Endpoint                     | Description               |
| ------ | ---------------------------- | ------------------------- |
| GET    | `/messages/{conversationId}` | Get conversation messages |

> Update the endpoints above to match the actual APIs implemented in the project.

## 🔌 WebSocket

The WebSocket connection is used for real-time messaging.

Example events:

| Event         | Description                    |
| ------------- | ------------------------------ |
| `connect`     | Establish WebSocket connection |
| `sendMessage` | Send a message                 |
| `newMessage`  | Receive a new message          |
| `disconnect`  | Close WebSocket connection     |

> Update the event names to match the actual events implemented in the project.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/VuDuong-sketch/real-time-chat-app.git

cd real-time-chat
```

### 2. Set up MongoDB

Make sure MongoDB is running locally or provide a MongoDB connection string.

Example:

```text
mongodb://localhost:27017/real_time_chat
```

Create a `.env` file in the backend:

```env
MONGODB_URI=mongodb://localhost:27017/real_time_chat
```

> Do not commit your `.env` file to GitHub.

### 3. Run the Backend

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run start:dev
```

The backend will normally run on:

```text
http://localhost:3000
```

### 4. Run the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## 🧪 API Testing

REST APIs can be tested using **Postman**.

WebSocket communication can be tested using a WebSocket client or directly through the application frontend.

## 🚧 Future Improvements

* Add online / offline status
* Add typing indicators
* Add message read status
* Add message timestamps
* Add image and file sharing
* Add group conversations
* Add message search
* Add notifications
* Add automated testing
* Deploy the application

## 👨‍💻 Author

**Vu Duong**

GitHub: https://github.com/VuDuong-sketch
