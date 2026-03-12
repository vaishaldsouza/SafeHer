import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/auth.css";

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd call an API here
    console.log("Signup data:", formData);
    // For demo purposes, we just redirect to home
    localStorage.setItem("user", JSON.stringify({ name: formData.name, email: formData.email }));
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{t('auth.join')}</h2>
          <p>{t('auth.signup_desc')}</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('auth.name')}</label>
            <input
              type="text"
              required
              placeholder="Janaki Devi"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
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
          <button type="submit" className="auth-btn">
            {t('auth.signup')}
          </button>
        </form>
        <div className="auth-footer">
          {t('auth.have_account')}
          <Link to="/login">{t('auth.login')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
