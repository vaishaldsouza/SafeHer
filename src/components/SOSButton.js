import React from "react";
import "../styles/sos.css";

function SOSButton({triggerSOS}){

return(

<button
className="sos-float"
onClick={triggerSOS}
>

🚨 SOS

</button>

)

}

export default SOSButton;