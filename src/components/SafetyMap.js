import React from "react";
import "../styles/map.css";

function SafetyMap(){

return(

<section className="map-section">

<h2>Live Safety Map</h2>

<div className="map-grid">

<div className="zone safe">
Safe Zone
</div>

<div className="zone medium">
Moderate Risk
</div>

<div className="zone danger">
Crime Zone
</div>

</div>

</section>

)

}

export default SafetyMap;