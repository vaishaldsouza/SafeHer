import React from "react";
import "../styles/features.css";
import { useTranslation } from "react-i18next";

function Features() {
  const { t } = useTranslation();

  const featuresData = [
    { title: t('features.items.sos.title'), color: "red", description: t('features.items.sos.desc') },
    { title: t('features.items.voice.title'), color: "red", description: t('features.items.voice.desc') },
    { title: t('features.items.offline.title'), color: "green", description: t('features.items.offline.desc') },
    { title: t('features.items.gps.title'), color: "green", description: t('features.items.gps.desc') },
    { title: t('features.items.navigation.title'), color: "blue", description: t('features.items.navigation.desc') },
    { title: t('features.items.crime_alerts.title'), color: "blue", description: t('features.items.crime_alerts.desc') },
    { title: t('features.items.vehicle_verify.title'), color: "blue", description: t('features.items.vehicle_verify.desc') },
    { title: t('features.items.location_share.title'), color: "purple", description: t('features.items.location_share.desc') },
  ];

  const handleClick = (title) => {
    alert(`Feature clicked: ${title}`);
  };

  return (
    <section className="features-section" id="features">
      <h2>{t('features.title')}</h2>
      <div
        className="features-grid"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }} // More responsive grid
      >
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className={`feature-card ${feature.color}`}
            onClick={() => handleClick(feature.title)}
            tabIndex={0}
          >
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;