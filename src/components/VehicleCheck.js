import React,{useState} from "react";
import "../styles/vehicle.css";

function VehicleCheck(){

const [vehicle,setVehicle]=useState("");
const [result,setResult]=useState("");

const verifyVehicle=()=>{

if(vehicle==="KA01AB1234"){
setResult("Registered Vehicle");
}
else{
setResult("Vehicle Not Found");
}

}

return(

<section id="vehicle" className="vehicle-section">

<h2>Vehicle Verification</h2>

<input
placeholder="Enter Taxi / Auto Number"
onChange={(e)=>setVehicle(e.target.value)}
/>

<button onClick={verifyVehicle}>
Check Vehicle
</button>

<p>{result}</p>

</section>

)

}

export default VehicleCheck;