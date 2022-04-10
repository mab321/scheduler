import React, { useState,useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  
  // handle updating spots remaining
  const updatingSpots = function (state, appointments ,appointmentId, remove = true) {
    
  // check if the id exists in state.days.appointments to differentiate update from create
    const daysToCopy = [...state.days];
    //console.log("daysToCpy",daysToCopy);
    const copyDay = daysToCopy.find((d) => d.appointments.includes(appointmentId));
    //console.log("updating copyDay", copyDay);
    const finalDayIndex = [...state.days].findIndex((myDay) => myDay.id === copyDay.id);
    //console.log("finalDay", finalDayIndex);
    const checkAppointments = appointments[appointmentId].interview;
  // console.log("checkAppoitnments",checkAppointments);
   // check delete or Create operation and do not do anything to spots when just updating
    if (remove && checkAppointments !== null) {
      copyDay.spots = copyDay.spots - 1;
    } else if(!remove) {
      copyDay.spots = copyDay.spots + 1;
    }

    const updatingDays = [...state.days];
    //console.log("updatingDays",updatingDays)
    updatingDays[finalDayIndex].spots = copyDay.spots;
    //console.log("day changed",updatingDays[finalDayIndex]);

    return updatingDays;

  }
  
  useEffect(() => {
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      
    })
    
  }, []);


  const bookInterview = function(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`api/appointments/${id}`, {interview})
    .then(()=> {
      setState({
        ...state,
        appointments,
        days: updatingSpots(state, appointments, id)
      });
    })
    
  }

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`api/appointments/${id}`)
    .then(()=> {
      setState({
        ...state,
        appointments,
        days: updatingSpots(state, appointments, id, false)
      });
    })
  }

  

  return {state, setDay, bookInterview, cancelInterview};
}