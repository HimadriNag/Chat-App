# 💬 MERN Stack Chat Application

A real-time chat application built using the MERN stack with WebSocket-based communication. This project demonstrates full-stack development concepts including authentication, real-time messaging, and responsive UI design.

---

## 🚀 Features

- 🔐 Secure Authentication (JWT + bcrypt)
- ⚡ Real-time Messaging using Socket.io  
- 🟢 Online / Offline User Status  
- ✍ Typing Indicators  
- 🖼 Image Sharing in Chats  
- 💾 Persistent Chat History  
- 👤 Private One-to-One Chat  
- 📱 Fully Responsive UI  
- 🧩 Modular and Scalable Code Structure  

---

## 🛠 Tech Stack

### Frontend
- React.js  
- Context API  
- Axios  
- Socket.io-client  
- Responsive UI Design  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- Socket.io  
- JWT Authentication  
- REST APIs  

### Tools
- Git & GitHub  
- Postman  
- Environment Variables  
- VS Code  

---

## 🏗 Project Structure

Chat-App/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── README.md

---

## ⚙ Installation & Setup

### 1. Clone the Repository

git clone https://github.com/HimadriNag/Chat-App.git
cd Chat-App

---

### 2. Backend Setup

cd backend
npm install

Create a .env file inside the backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

#### Run Backend Server

npm run server

---

### 3. Frontend Setup

Open a new terminal and run:

cd frontend
npm install

#### Run Frontend

npm run dev

---

### Application will run on:

Frontend:
http://localhost:5173

Backend:
http://localhost:5000

---

## 📌 How It Works

1. User registers or logs in  
2. JWT token is generated for authentication  
3. Users can chat in real time  
4. Messages are stored in MongoDB  
5. Socket.io handles instant communication  
6. Images can be shared within chats  
7. UI updates dynamically without reload  

---

## 📷 Demo & Screenshots

- Full demo video and UI screenshots are available in the LinkedIn post  
- Mobile responsive interface included  

---

## 🚧 Limitations

- Currently not deployed  
- Supports image sharing only (file sharing not implemented yet)  

---

## 🔮 Future Enhancements

- Group Chat Feature  
- End-to-End Encryption  
- Push Notifications  
- Message Delete / Edit Option  
- Deployment to Production  

---

## 📚 What I Learned

- Real-time communication using WebSockets  
- Building secure authentication systems  
- Full-stack integration  
- State management in React  
- API development with Node & Express  
- MongoDB schema design  
- Debugging and structuring large projects  

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to fork the repository and submit a pull request.

---

## 📬 Contact

Himadri Nag  
GitHub: https://github.com/HimadriNag  
Email: himadrinag92@gmail.com  

---

## ⭐ If you like this project, give it a star on GitHub!



