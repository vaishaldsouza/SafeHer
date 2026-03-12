import React from "react";
import "../styles/sos.css";
import { useTranslation } from "react-i18next";

function SOSButton({triggerSOS}){
  const { t } = useTranslation();
  return(
    <button
      className="sos-float"
      onClick={triggerSOS}
    >
      🚨 {t('sos.button')}
    </button>
  )
}

export default SOSButton;