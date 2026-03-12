// src/services/offlineService.js
export const storeOffline = (key, data) => {
  const existing = JSON.parse(localStorage.getItem(key)) || [];
  existing.push(data);
  localStorage.setItem(key, JSON.stringify(existing));
};

export const getOffline = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const removeOffline = (key) => {
  localStorage.removeItem(key);
};