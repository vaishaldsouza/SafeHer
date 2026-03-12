import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/auth.css";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd call an API here
    console.log("Login data:", formData);
    // For demo purposes, we just redirect to home
    localStorage.setItem("user", JSON.stringify({ email: formData.email }));
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{t('auth.welcome')}</h2>
          <p>{t('auth.login_desc')}</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('auth.email')}</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>{t('auth.password')}</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div style={{ textAlign: 'right', marginTop: '-10px' }}>
            <Link to="/forgot-password" style={{ fontSize: '13px', color: '#3b82f6', textDecoration: 'none' }}>
              {t('auth.forgot_password')}
            </Link>
          </div>
          <button type="submit" className="auth-btn">
            {t('auth.login')}
          </button>
        </form>
        <div className="auth-footer">
          {t('auth.no_account')}
          <Link to="/signup">{t('auth.signup')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
