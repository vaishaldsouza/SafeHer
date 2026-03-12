// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgot-password";

  // Scroll to section by id
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">{t('app_name')}</Link>
      {!isAuthPage && (
        <ul className="nav-links">
          <li>
            <button onClick={() => scrollToSection("home")}>{t('nav.home')}</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("features")}>{t('nav.features')}</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("map")}>{t('nav.map')}</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("vehicle")}>{t('nav.vehicle')}</button>
          </li>
        </ul>
      )}
      <div className="nav-controls">
        {!isAuthPage && (
          <div className="auth-nav">
            <Link to="/login" className="nav-btn-outline">{t('auth.login')}</Link>
            <Link to="/signup" className="nav-btn-solid">{t('auth.signup')}</Link>
          </div>
        )}
        <select 
          onChange={(e) => changeLanguage(e.target.value)} 
          value={i18n.language}
          className="lang-select"
        >
          <option value="en">{t('language.en')}</option>
          <option value="hi">{t('language.hi')}</option>
          <option value="kn">{t('language.kn')}</option>
          <option value="ta">{t('language.ta')}</option>
          <option value="te">{t('language.te')}</option>
          <option value="es">{t('language.es')}</option>
          <option value="fr">{t('language.fr')}</option>
        </select>
        <button className="theme-toggle" onClick={toggleTheme} title={t(`theme.${theme === 'light' ? 'dark' : 'light'}`)}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;