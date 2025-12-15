<<<<<<< HEAD
# BondBeat
Real-Time YouTube Sync &amp; Chat Platform - Collaborative Online Music_Player
=======
# 🎵 BondBeat – Real-Time Collaborative YouTube Watch Party

BondBeat is a **full-stack real-time video sync platform** that allows multiple users to watch, control, and chat over YouTube videos in a shared virtual room.  
Built with **React (Vite)** on the frontend, **Spring Boot** on the backend, and **MySQL** for persistent storage.

---

## 🚀 Features

- **🔗 Real-Time Video Sync** – Watch YouTube videos in perfect sync across all connected devices.
- **🗂 Collaborative Playlist** – Add, select, and delete videos with instant updates on all clients.
- **💬 Live Chat** – Interact with other viewers in the same room through a real-time chat box.
- **⚡ <100ms Latency** – Built with **WebSocket (STOMP + SockJS)** for near-instant updates.
- **📱 Responsive Design** – Works smoothly across desktops, tablets, and mobile devices.
- **🛠 Modular Architecture** – Component-based React frontend and RESTful Spring Boot backend.

---

## 🖥 Tech Stack

**Frontend**
- React (Vite)  
- JavaScript (ES6+)
- YouTube IFrame API  
- WebSocket Client (SockJS, STOMP)  
- CSS3 (Responsive Design)

**Backend**
- Spring Boot  
- Spring WebSocket  
- RESTful APIs  
- JPA (Hibernate)  
- MySQL  

---

## 📸 Screenshots
<img width="757" height="338" alt="image" src="https://github.com/user-attachments/assets/0af3efdf-7a67-4590-91a7-ea50c66a4fe6" />
<img width="841" height="352" alt="image" src="https://github.com/user-attachments/assets/1dfa1699-e8a6-4eb3-a1b5-51fa4d16b9c6" />
<img width="1023" height="813" alt="image" src="https://github.com/user-attachments/assets/26dce990-a85b-4681-b5c5-15ff12132454" />
<img width="920" height="429" alt="image" src="https://github.com/user-attachments/assets/5362a98d-bada-43ce-a218-f0cceeacb1d6" />

---

## 📡 How It Works
- **Join a Room** – Each user enters a unique room via link.
- **Add Videos** – Use the form to add YouTube videos to the shared playlist.
- **Delete Videos** – Use the form to delete YouTube videos to the shared playlist.
- **Skip Videos** – 5 sec palying song can aslo be skipped.
- **Control Playback** – Play, pause, or next — changes are synced for all users in real-time.
- **Chat & Interact** – Send messages via the integrated live chat box.

---

## 📈 System Architecture

[ React + Vite ] <-> [ WebSocket / REST APIs ] <-> [ Spring Boot Backend ] <-> [ MySQL DB ]

- WebSocket handles real-time video sync and chat messages.
- REST APIs manage playlist CRUD operations.
- MySQL stores persistent playlist data.

---

_BondBeat – Watch. Sync. Connect._
>>>>>>> 44bcf003f2eeed2487ee82364ed3119732245644
