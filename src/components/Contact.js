import React, { useState, useEffect } from "react";
import { sendSOSToServer } from "../services/shareLocationService";
import { isOnline } from "../services/offlineService";
import "../styles/contact.css";

const STORAGE_KEY  = "safeher_emergency_contacts";
const USERNAME_KEY = "safeher_user_name";

const RELATION_OPTIONS = ["Family", "Friend", "Partner", "Colleague", "Neighbour"];
const RELATION_ICONS   = {
  Family: "👨‍👩‍👧", Friend: "👫", Partner: "💑", Colleague: "🤝", Neighbour: "🏠",
};

function loadContacts() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function Contact() {
  const [contacts,  setContacts]  = useState(loadContacts);
  const [userName,  setUserName]  = useState(localStorage.getItem(USERNAME_KEY) || "");
  const [newName,   setNewName]   = useState("");
  const [newPhone,  setNewPhone]  = useState("");
  const [relation,  setRelation]  = useState("Family");
  const [error,     setError]     = useState("");
  const [sosStatus, setSosStatus] = useState(null); // null | "sending" | "sent" | "offline" | "error"
  const [editingName, setEditingName] = useState(false);

  /* Persist contacts */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  /* Persist user name */
  useEffect(() => {
    if (userName) localStorage.setItem(USERNAME_KEY, userName);
  }, [userName]);

  const validatePhone = (p) => /^[+]?[\d\s\-]{10,15}$/.test(p.trim());

  const addContact = () => {
    setError("");
    if (!newName.trim())          return setError("Please enter a name.");
    if (!validatePhone(newPhone)) return setError("Enter a valid phone number (10-15 digits).");
    if (contacts.length >= 5)     return setError("Maximum 5 emergency contacts allowed.");

    const contact = {
      id:       Date.now(),
      name:     newName.trim(),
      phone:    newPhone.trim(),
      relation: relation,
    };

    setContacts(prev => [...prev, contact]);
    setNewName(""); setNewPhone(""); setRelation("Family");
  };

  const removeContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  /* ── Real SOS — sends SMS via Twilio through backend ── */
  const triggerSOS = async () => {
    if (contacts.length === 0) {
      setError("Add at least one emergency contact before sending SOS.");
      return;
    }

    setSosStatus("sending");
    setError("");

    /* Get current GPS location */
    let location = { lat: 0, lng: 0 };
    try {
      location = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 8000 }
        );
      });
    } catch {
      /* Use last known or default if GPS fails */
      console.warn("GPS unavailable, sending without location.");
    }

    const result = await sendSOSToServer({
      userName: userName || "SafeHer User",
      contacts: contacts.map(c => ({ name: c.name, phone: c.phone })),
      location,
    });

    if (result.offline) {
      setSosStatus("offline");
    } else if (result.success) {
      setSosStatus("sent");
    } else {
      setSosStatus("error");
    }

    /* Reset status after 5 seconds */
    setTimeout(() => setSosStatus(null), 5000);
  };

  const online = isOnline();

  return (
    <section id="contact" className="contact-section">

      <h2>Emergency Contacts</h2>
      <p>These contacts will receive a real SMS with your live location when SOS is triggered.</p>

      {/* Online / Offline indicator */}
      <div className={`contact-online-badge ${online ? "online" : "offline"}`}>
        {online ? "🟢 Online — SMS will send instantly" : "🔴 Offline — SOS will queue and send when reconnected"}
      </div>

      {/* User name */}
      <div className="contact-username">
        {editingName ? (
          <div className="contact-username-edit">
            <input
              type="text"
              placeholder="Your name (sent in SOS message)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={() => setEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingName(false)}
              autoFocus
              maxLength={30}
            />
          </div>
        ) : (
          <button className="contact-username-display" onClick={() => setEditingName(true)}>
            👤 {userName || "Set your name for SOS message"} ✏️
          </button>
        )}
      </div>

      {/* Existing contacts */}
      <div className="contact-list">
        {contacts.length === 0 && (
          <div className="contact-empty">
            <span>👥</span>
            <p>No contacts yet. Add up to 5 people below.</p>
          </div>
        )}
        {contacts.map((contact, i) => (
          <div key={contact.id} className="contact-card" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="contact-avatar">{RELATION_ICONS[contact.relation] || "👤"}</div>
            <div className="contact-info">
              <strong>{contact.name}</strong>
              <div className="contact-meta">
                <span className="contact-relation-badge">{contact.relation}</span>
                <span className="contact-phone">📞 {contact.phone}</span>
              </div>
            </div>
            <button className="contact-remove-btn" onClick={() => removeContact(contact.id)}>✕</button>
          </div>
        ))}
      </div>

      {/* Add contact form */}
      {contacts.length < 5 && (
        <div className="contact-add">
          <h3>Add Contact <span className="contact-count">{contacts.length}/5</span></h3>
          <div className="contact-add-inputs">
            <input
              type="text"
              placeholder="Contact name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addContact()}
              maxLength={30}
            />
            <input
              type="tel"
              placeholder="Phone number (e.g. +919876543210)"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addContact()}
            />
            <select value={relation} onChange={(e) => setRelation(e.target.value)}>
              {RELATION_OPTIONS.map(r => (
                <option key={r} value={r}>{RELATION_ICONS[r]} {r}</option>
              ))}
            </select>
          </div>
          {error && <p className="contact-error">⚠ {error}</p>}
          <button className="contact-add-btn" onClick={addContact}>+ Add Contact</button>
        </div>
      )}

      {/* SOS Button */}
      <div className="contact-sos-wrap">
        <div className="contact-sos-info">
          🚨 Pressing SOS sends a real SMS to all contacts above with your live GPS location link.
        </div>
        <button
          className={`contact-sos-btn ${sosStatus ? `sos-${sosStatus}` : ""}`}
          onClick={triggerSOS}
          disabled={sosStatus === "sending" || contacts.length === 0}
        >
          {sosStatus === "sending" && "📡 Sending SOS..."}
          {sosStatus === "sent"    && "✅ SOS Sent to All Contacts!"}
          {sosStatus === "offline" && "📵 Queued — Will Send When Online"}
          {sosStatus === "error"   && "❌ Failed — Queued for Retry"}
          {!sosStatus              && "🚨 Send SOS Alert"}
        </button>
      </div>

    </section>
  );
}

export default Contact;