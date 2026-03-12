import React,{useState,useEffect} from "react";

function NetworkStatus(){

const [online,setOnline]=useState(navigator.onLine);

useEffect(()=>{

window.addEventListener("online",()=>setOnline(true));
window.addEventListener("offline",()=>setOnline(false));

},[])

return(

<div style={{
position:"fixed",
top:"20px",
right:"20px",
background:"#111",
color:"white",
padding:"8px 14px",
borderRadius:"6px"
}}>

{online ? "🟢 Online Mode" : "🔴 Offline Mode"}

</div>

)

}

export default NetworkStatus;