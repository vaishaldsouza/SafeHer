import React from "react";
import "../styles/sos.css";

function VoiceSOS({triggerSOS}){

const startVoice=()=>{

const rec=new window.webkitSpeechRecognition();

rec.start();

rec.onresult=(e)=>{

const text=e.results[0][0].transcript;

if(text.toLowerCase().includes("help")){
triggerSOS();
}

}

}

return(

<button className="voice-btn" onClick={startVoice}>

🎤 Voice SOS

</button>

)

}

export default VoiceSOS;