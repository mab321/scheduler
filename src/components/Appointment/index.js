import React from "react";

import "./style.scss";
export default function Appointment(props) {
   

   return (
    <article className="appointment">{props.time ? `Appointment at ${props.time}`: "No Appointment"}</article>

   );
}