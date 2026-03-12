# SafeHer – Hands-Free Emergency Alert System for Women's Safety

**A Progressive Web App (PWA) that enables instant, voice-activated emergency alerts in public spaces – no unlocking phone required.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10-orange)](https://firebase.google.com/)

##  Problem Statement

Women frequently face safety risks in public spaces (streets, public transport, neighbourhoods). In critical situations harassment, assault, or threat manually operating a smartphone (unlocking screen, opening app, pressing button) is often impossible due to panic, physical restraint, or time pressure.

**Voice SOS** solves this by providing **hands-free, voice-triggered emergency communication** using a simple wake word/phrase (e.g. “Help”, “Bachao”, “SOS”).  
Once triggered, the system instantly:
- Captures current GPS location
- Sends SMS with live location link to emergency contacts (and optionally police)
- Starts silent audio recording for evidence
- Optionally notifies family via push/email

**Mapped SDGs**  
- **SDG 5** – Gender Equality  
- **SDG 11** – Sustainable Cities and Communities  
- **SDG 16** – Peace, Justice and Strong Institutions

##  Key Features (MVP – Current)

- Customizable wake words (English/Hindi support planned)  
- Instant GPS location capture & Google Maps link generation  
- SMS alerts to 3–5 emergency contacts via Twilio + Firebase  
- Silent audio recording on trigger (stored in Firebase Storage)  
- Progressive Web App (installable on Android/iOS home screen)  
- Offline queuing of alerts when network is poor  
- Privacy-first: all voice processing on-device (no audio sent to cloud)

##  Tech Stack

| Layer              | Technology                          | Purpose                              |
|--------------------|-------------------------------------|--------------------------------------|
| Frontend           | React + Vite                        | Fast development & PWA support       |
| Voice Detection    | Picovoice Porcupine Web             | Lightweight, on-device wake-word     |
| Microphone Access  | @picovoice/web-voice-processor      | Browser microphone streaming         |
| Backend / Storage  | Firebase (Firestore + Storage)      | User data, contacts, recordings      |
| SMS Delivery       | Twilio (via Firebase Extension)     | Reliable emergency messaging         |
| Location           | Browser Geolocation API             | Real-time coordinates                |
| Notifications      | Firebase Cloud Messaging (FCM)      | Optional family alerts               |
| Deployment         | Firebase Hosting / Vercel / Netlify | Free & fast global CDN               |


##  Quick Start (Local Development)

### Prerequisites
- Node.js ≥ 18
- npm / yarn / pnpm
- Firebase project (console.firebase.google.com)
- Picovoice Access Key (console.picovoice.ai – free for dev)
- Twilio account & phone number (twilio.com – $15 free credit)

### Steps

1. Clone the repository
   ```bash
   git clone https://github.com/vaishaldsouza/SafeHer.git
   cd SafeHer
