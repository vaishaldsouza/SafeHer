import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/auth.css";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd call an API here
    console.log("Reset password for:", email);
    setSubmitted(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{t('auth.reset_password')}</h2>
          <p>{t('auth.forgot_desc')}</p>
        </div>
        
        {!submitted ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('auth.email')}</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-btn">
              {t('auth.reset_password')}
            </button>
          </form>
        ) : (
          <div className="auth-success-message" style={{ textAlign: 'center', color: '#94a3b8', margin: '20px 0' }}>
            <p style={{ color: '#60a5fa', fontWeight: '700', marginBottom: '10px' }}>✅ {t('auth.email')}</p>
            <p>{t('auth.reset_link_sent')}</p>
          </div>
        )}
        
        <div className="auth-footer">
          <Link to="/login">{t('auth.back_to_login')}</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
