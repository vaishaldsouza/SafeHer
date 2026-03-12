import React from "react";
import "../styles/features.css";

const features = [

{title:"SOS Emergency",desc:"Instant panic alert",color:"red"},
{title:"Voice SOS",desc:"Say HELP to activate SOS",color:"red"},
{title:"Offline Emergency SMS",desc:"Works without internet",color:"green"},
{title:"GPS Location Detection",desc:"Detect user location",color:"green"},
{title:"Safe Route Navigation",desc:"Avoid risky areas",color:"blue"},
{title:"Crime Zone Alerts",desc:"Warns when entering danger zone",color:"blue"},
{title:"Vehicle Verification",desc:"Check taxi authenticity",color:"blue"},
{title:"Live Location Sharing",desc:"Share with trusted contacts",color:"purple"}

]

function Features(){

return(

<section id="features" className="features">

{features.map((f,i)=>(

<div key={i} className={`feature-card ${f.color}`}>

<h3>{f.title}</h3>

<p>{f.desc}</p>

</div>

))}

</section>

)

}

export default Features;