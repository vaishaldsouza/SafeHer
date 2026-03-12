const fs = require("fs");
const path = require("path");
const contactsFile = path.join(__dirname, "../data/contacts.json");

exports.getContacts = () => {
  return JSON.parse(fs.readFileSync(contactsFile));
};

exports.addContact = (name, phone) => {
  const contacts = JSON.parse(fs.readFileSync(contactsFile));
  contacts.push({ name, phone });
  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
};

exports.removeContact = (phone) => {
  let contacts = JSON.parse(fs.readFileSync(contactsFile));
  contacts = contacts.filter(c => c.phone !== phone);
  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
};