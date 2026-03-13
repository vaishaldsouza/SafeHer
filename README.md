# 🛡️ SafeHer — Women's Safety App

A comprehensive women's safety web application built with React, featuring real-time emergency alerts, GPS tracking, safe route navigation, and more.

🌐 **Live App:** [https://safeher-nu.vercel.app](https://safeher-nu.vercel.app)

---

## ✨ Features

- 🆘 **SOS Panic Button** — Instantly alert trusted contacts with one tap
- 🎙️ **Voice Trigger SOS** — Say "Help" to automatically send an emergency alert
- 📡 **Offline Emergency SMS** — Send SOS even without internet connectivity
- 📍 **GPS Location Detection** — Real-time location tracking at all times
- 🗺️ **Safe Route Navigation** — Smart routes that avoid crime-prone areas
- ⚠️ **Crime Zone Alerts** — Instant notifications when entering unsafe zones
- 🚕 **Vehicle Verification** — Check if a taxi/auto is officially registered
- 👁️ **Live Location Sharing** — Share your live journey with trusted contacts

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Node.js + Express |
| SMS Alerts | Twilio API |
| Deployment | Vercel (Frontend) |
| Version Control | GitHub |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm
- Twilio account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vaishaldsouza/SafeHer.git
   cd SafeHer
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Set up environment variables**

   Create a `server/.env` file:
   ```env
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_number
   ```

5. **Run the app locally**

   Frontend:
   ```bash
   npm start
   ```

   Backend (in a separate terminal):
   ```bash
   cd server
   node index.js
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
SafeHer/
├── public/
├── src/
│   ├── components/
│   │   ├── Features.js
│   │   ├── Contact.js
│   │   └── ...
│   ├── styles/
│   └── App.js
├── server/
│   ├── index.js
│   └── .env          ← never commit this!
├── .gitignore
└── package.json
```

---

## 🔐 Security

- All API keys are stored in `.env` files and never committed to GitHub
- `.gitignore` is configured to exclude all sensitive files
- Twilio credentials are managed via environment variables on the server

---

## 🌍 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- Auto-deploys on every push to the `main` branch

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is for educational and social good purposes.

---

Made with ❤️ to make the world safer for women.
