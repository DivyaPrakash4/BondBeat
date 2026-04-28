# 🎵 BondBeat – Real-Time Collaborative YouTube Watch Party

![License](https://img.shields.io/github/license/DivyaPrakash4/BondBeat)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-brightgreen)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Docker](https://img.shields.io/badge/Deployment-Docker-blue)
![WebSocket](https://img.shields.io/badge/Sync-WebSocket%20STOMP-orange)

BondBeat is a **full-stack microservices-based real-time video synchronization platform**. It empowers users to create virtual rooms where they can watch YouTube videos together, manage a collaborative playlist, and interact via live chat—all perfectly synchronized with sub-100ms latency.

---

## 🚀 Key Features

- **🔗 Real-Time Video Sync** – Seamlessly watch YouTube videos in perfect sync across all connected devices. Play, pause, and seek actions are broadcasted instantly.
- **🗂 Collaborative Playlist** – Any user in the room can add, select, or remove videos from the shared queue.
- **💬 High-Performance Live Chat** – Integrated real-time messaging using WebSockets (STOMP + SockJS) for a truly social experience.
- **🔐 JWT Authentication** – Secure user management with JSON Web Tokens across microservices.
- **⚡ Microservices Architecture** – Scalable design with dedicated services for Authentication and Room Management.
- **📱 Premium Responsive UI** – A modern, dark-themed interface built with glassmorphism and smooth micro-animations.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Modern CSS3 (Glassmorphism, Flexbox/Grid)
- **Icons**: Lucide React
- **Real-time**: StompJS, SockJS
- **API Client**: Axios

### Backend (Microservices)
- **Language/Framework**: Java 17+, Spring Boot 3.x
- **Data Persistence**: JPA (Hibernate), MySQL 8.0
- **Security**: Spring Security, JWT
- **Communication**: Spring WebSocket (STOMP)

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: MySQL

---

## 🛰 Architecture Overview

BondBeat follows a modern microservices pattern:
1. **Auth Service**: Handles user registration, login, and JWT token issuance.
2. **Room Service**: Manages room creation, playlist persistence, and real-time WebSocket synchronization.
3. **Frontend**: A high-fidelity React application that interacts with both services via REST and WebSockets.
4. **Database**: MySQL instances for persistent storage of users and room data.

---

## 🏁 Getting Started

### Prerequisites
- **Docker & Docker Compose** (Recommended)
- **OR**
- **Java 17+** & **Maven**
- **Node.js 18+**
- **MySQL 8.0**

### 🐳 Quick Start with Docker
The easiest way to run BondBeat is using Docker Compose:

1. Clone the repository:
   ```bash
   git clone https://github.com/DivyaPrakash4/BondBeat.git
   cd BondBeat
   ```
2. Build and start all services:
   ```bash
   docker-compose up --build
   ```
3. Access the application:
   - **Frontend**: `http://localhost:80`
   - **Auth Service**: `http://localhost:8081`
   - **Room Service**: `http://localhost:8082`

---

### 🛠 Manual Local Setup

#### 1. Backend Services
Navigate to each service directory (`auth-service` and `room-service`) and run:
```bash
mvn spring-boot:run
```

#### 2. Frontend
Navigate to the `frontend` directory:
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <i>BondBeat – Watch. Sync. Connect.</i><br>
  Built with ❤️ for music and video lovers.
</p>
