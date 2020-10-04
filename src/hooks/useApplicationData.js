import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });
  
  function changeSpots(days, day, change) {
    const selectedDay = days.filter((x) => x.name === day)[0];
    console.log(selectedDay)
    if (change === 'minus') {
      selectedDay.spots -= 1
    } 
    if (change === 'plus') {
      selectedDay.spots += 1
    } 
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    changeSpots(state.days, state.day, "minus");

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => (setState({ ...state, appointments })));
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
    changeSpots(state.days, state.day, "plus");

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => (setState({ ...state, appointments })))
  }

  useEffect(() => {
    Promise.all([
      axios.get(('/api/days')),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    })
  }, []);

  return {state, setDay, bookInterview, cancelInterview}
  
}
