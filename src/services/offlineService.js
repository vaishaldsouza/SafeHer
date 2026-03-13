/* ─────────────────────────────────────────
   offlineService.js
   Generic offline storage + SOS queue
   that auto-sends when internet returns
───────────────────────────────────────── */

const SOS_QUEUE_KEY = "safeher_sos_queue";

/* ── Generic key-value storage ── */

export const saveOffline = (key, data) => {
  try {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    existing.push({ ...data, savedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (err) {
    console.error("saveOffline error:", err);
  }
};

export const getOffline = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

export const removeOffline = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("removeOffline error:", err);
  }
};

/* ── SOS Queue — saves SOS when offline, sends when online ── */

/*
  queueSOS
  ---------
  Call this when SOS is triggered but no internet.
  Stores the SOS payload to be sent later.
*/
export const queueSOS = ({ userName, contacts, location }) => {
  saveOffline(SOS_QUEUE_KEY, { userName, contacts, location });
  console.warn("📵 Offline — SOS queued. Will send when online.");
};

/*
  flushSOSQueue
  --------------
  Call this when the app detects the user is back online.
  Sends all queued SOS alerts to the server and clears the queue.
*/
export const flushSOSQueue = async () => {
  const queue = getOffline(SOS_QUEUE_KEY);
  if (queue.length === 0) return;

  console.log(`📤 Flushing ${queue.length} queued SOS alert(s)...`);

  const failed = [];

  for (const sos of queue) {
    try {
      const res = await fetch("http://localhost:5000/sos", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(sos),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      console.log("✅ Queued SOS sent successfully.");
    } catch (err) {
      console.error("❌ Failed to flush SOS:", err);
      failed.push(sos);
    }
  }

  /* Keep only the ones that failed to retry next time */
  if (failed.length > 0) {
    localStorage.setItem(SOS_QUEUE_KEY, JSON.stringify(failed));
  } else {
    removeOffline(SOS_QUEUE_KEY);
  }
};

/*
  initOfflineListener
  --------------------
  Call once on app mount (in App.js useEffect).
  Automatically flushes SOS queue when internet returns.
*/
export const initOfflineListener = () => {
  window.addEventListener("online", () => {
    console.log("🌐 Back online — flushing SOS queue...");
    flushSOSQueue();
  });

  /* Flush immediately on init in case we're already online with pending items */
  if (navigator.onLine) {
    flushSOSQueue();
  }
};

/* Check current connectivity */
export const isOnline = () => navigator.onLine;