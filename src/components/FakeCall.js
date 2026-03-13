import React, { useState, useEffect, useRef } from "react";
import "../styles/fakecall.css";

const PRESET_CALLERS = [
  { name: "Mom",    emoji: "👩", number: "+91 98765 43210" },
  { name: "Dad",    emoji: "👨", number: "+91 98765 43211" },
  { name: "Sister", emoji: "👧", number: "+91 98765 43212" },
  { name: "Boss",   emoji: "👔", number: "+91 80000 12345" },
  { name: "Custom", emoji: "👤", number: "" },
];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function FakeCall() {
  const [showOverlay,   setShowOverlay]   = useState(false);
  const [callStatus,    setCallStatus]    = useState("incoming"); // incoming | active | ended
  const [selectedCaller, setSelectedCaller] = useState(PRESET_CALLERS[0]);
  const [customName,    setCustomName]    = useState("");
  const [customNumber,  setCustomNumber]  = useState("");
  const [delay,         setDelay]         = useState(5);
  const [countdown,     setCountdown]     = useState(null);
  const [callTimer,     setCallTimer]     = useState(0);
  const [vibrating,     setVibrating]     = useState(false);

  const audioRef   = useRef(null);
  const timerRef   = useRef(null);
  const countRef   = useRef(null);

  /* Ringtone */
  useEffect(() => {
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/1359/1359-preview.mp3");
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  /* Play/stop ringtone */
  useEffect(() => {
    if (showOverlay && callStatus === "incoming") {
      audioRef.current?.play().catch(() => {});
      setVibrating(true);
    } else {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      setVibrating(false);
    }
  }, [showOverlay, callStatus]);

  /* Call timer when active */
  useEffect(() => {
    if (callStatus === "active") {
      timerRef.current = setInterval(() => setCallTimer(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      setCallTimer(0);
    }
    return () => clearInterval(timerRef.current);
  }, [callStatus]);

  /* Countdown before triggering */
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      setShowOverlay(true);
      setCallStatus("incoming");
      return;
    }
    countRef.current = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(countRef.current);
  }, [countdown]);

  const triggerNow = () => {
    setCountdown(null);
    setShowOverlay(true);
    setCallStatus("incoming");
  };

  const triggerDelayed = () => {
    setCountdown(delay);
  };

  const cancelCountdown = () => {
    clearTimeout(countRef.current);
    setCountdown(null);
  };

  const acceptCall = () => {
    setCallStatus("active");
  };

  const endCall = () => {
    setCallStatus("ended");
    setTimeout(() => {
      setShowOverlay(false);
      setCallStatus("incoming");
    }, 1500);
  };

  const activeCaller = selectedCaller.name === "Custom"
    ? { name: customName || "Unknown", emoji: "👤", number: customNumber || "" }
    : selectedCaller;

  return (
    <>
      {/* ── DASHBOARD CARD ── */}
      <div className="fakecall-card">
        <div className="fakecall-card-top">
          <span className="fakecall-card-icon">📞</span>
          <div>
            <h3>Fake Call</h3>
            <p>Trigger a realistic incoming call to escape unsafe situations</p>
          </div>
        </div>

        {/* Caller selector */}
        <div className="fakecall-callers">
          {PRESET_CALLERS.map((c) => (
            <button
              key={c.name}
              className={`fakecall-caller-btn ${selectedCaller.name === c.name ? "active" : ""}`}
              onClick={() => setSelectedCaller(c)}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        {/* Custom name/number inputs */}
        {selectedCaller.name === "Custom" && (
          <div className="fakecall-custom-inputs">
            <input
              type="text"
              placeholder="Caller name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              maxLength={20}
            />
            <input
              type="text"
              placeholder="Phone number (optional)"
              value={customNumber}
              onChange={(e) => setCustomNumber(e.target.value)}
              maxLength={15}
            />
          </div>
        )}

        {/* Delay selector */}
        <div className="fakecall-delay">
          <span>Delay:</span>
          {[0, 5, 10, 15, 30].map((s) => (
            <button
              key={s}
              className={`fakecall-delay-btn ${delay === s ? "active" : ""}`}
              onClick={() => setDelay(s)}
            >
              {s === 0 ? "Now" : `${s}s`}
            </button>
          ))}
        </div>

        {/* Trigger buttons */}
        {countdown !== null ? (
          <div className="fakecall-countdown-wrap">
            <div className="fakecall-countdown">📞 Calling in {countdown}s...</div>
            <button className="fakecall-cancel-btn" onClick={cancelCountdown}>Cancel</button>
          </div>
        ) : (
          <button
            className="fakecall-trigger-btn"
            onClick={delay === 0 ? triggerNow : triggerDelayed}
          >
            📲 {delay === 0 ? "Trigger Fake Call Now" : `Schedule Call in ${delay}s`}
          </button>
        )}
      </div>

      {/* ── FULL SCREEN CALL OVERLAY ── */}
      {showOverlay && (
        <div className={`fakecall-overlay ${callStatus}`}>

          {/* Background blur circles */}
          <div className="fakecall-bg-circle c1" />
          <div className="fakecall-bg-circle c2" />

          {/* Top section */}
          <div className="fakecall-top">
            <div className="fakecall-status-text">
              {callStatus === "incoming" && "SafeHer · Incoming Call"}
              {callStatus === "active"   && "SafeHer · Secure Line"}
              {callStatus === "ended"    && "Call Ended"}
            </div>

            <div className={`fakecall-avatar ${vibrating ? "vibrate" : ""}`}>
              <span>{activeCaller.emoji}</span>
            </div>

            <div className="fakecall-caller-name">{activeCaller.name}</div>
            <div className="fakecall-caller-number">
              {callStatus === "active"
                ? formatTime(callTimer)
                : activeCaller.number || "Mobile"}
            </div>

            {callStatus === "incoming" && (
              <div className="fakecall-ripple-wrap">
                <div className="fakecall-ripple r1" />
                <div className="fakecall-ripple r2" />
                <div className="fakecall-ripple r3" />
              </div>
            )}
          </div>

          {/* Bottom actions */}
          <div className="fakecall-actions">
            {callStatus === "incoming" && (
              <>
                {/* Extra buttons row */}
                <div className="fakecall-extra-btns">
                  <div className="fakecall-extra-btn">
                    <div className="fakecall-extra-circle">🔕</div>
                    <span>Silence</span>
                  </div>
                  <div className="fakecall-extra-btn">
                    <div className="fakecall-extra-circle">💬</div>
                    <span>Message</span>
                  </div>
                  <div className="fakecall-extra-btn">
                    <div className="fakecall-extra-circle">⏰</div>
                    <span>Remind</span>
                  </div>
                </div>

                {/* Accept / Decline */}
                <div className="fakecall-main-btns">
                  <div className="fakecall-btn-wrap">
                    <button className="fakecall-btn decline" onClick={endCall}>
                      📞
                    </button>
                    <span>Decline</span>
                  </div>
                  <div className="fakecall-btn-wrap">
                    <button className="fakecall-btn accept" onClick={acceptCall}>
                      📞
                    </button>
                    <span>Accept</span>
                  </div>
                </div>
              </>
            )}

            {callStatus === "active" && (
              <>
                <div className="fakecall-active-btns">
                  <div className="fakecall-active-btn">
                    <div className="fakecall-active-circle">🔇</div>
                    <span>Mute</span>
                  </div>
                  <div className="fakecall-active-btn">
                    <div className="fakecall-active-circle">🔊</div>
                    <span>Speaker</span>
                  </div>
                  <div className="fakecall-active-btn">
                    <div className="fakecall-active-circle">⌨️</div>
                    <span>Keypad</span>
                  </div>
                  <div className="fakecall-active-btn">
                    <div className="fakecall-active-circle">➕</div>
                    <span>Add</span>
                  </div>
                </div>
                <div className="fakecall-btn-wrap">
                  <button className="fakecall-btn decline" onClick={endCall}>
                    📞
                  </button>
                  <span>End Call</span>
                </div>
              </>
            )}

            {callStatus === "ended" && (
              <div className="fakecall-ended-text">Call ended</div>
            )}
          </div>

        </div>
      )}
    </>
  );
}

export default FakeCall;