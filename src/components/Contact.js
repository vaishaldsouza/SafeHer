// src/components/Contact.js
import React, { useState } from "react";
import "../styles/contact.css";

function Contact() {
  const [contacts, setContacts] = useState([
    { name: "Soujanya", number: "+919380256014" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addContact = () => {
    if (newName && newNumber) {
      setContacts([...contacts, { name: newName, number: newNumber }]);
      setNewName("");
      setNewNumber("");
    }
  };

  const removeContact = (index) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Emergency Contacts</h2>
      <p>These contacts will receive SOS alerts.</p>

      <div className="contact-list">
        {contacts.map((contact, index) => (
          <div key={index} className="contact-card">
            <div>
              <strong>{contact.name}</strong>
              <p>{contact.number}</p>
            </div>
            <button onClick={() => removeContact(index)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="contact-add">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>
    </section>
  );
}

export default Contact;