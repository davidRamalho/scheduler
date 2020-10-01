import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "./Appointment/index.js"
import {getAppointmentsForDay, getInterview} from "../helpers/selectors"
import "components/Application.scss";


// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "3pm",
//     interview: {
//       student: "Bob Jones",
//       interviewer: {
//         id: 4,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "4pm",
//     interview: {
//       student: "Alan Park",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "3pm",
//     interview: {
//       student: "Roger Federer",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   }
// ];




export default function Application(props) {
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {}
  });
 
  const setDay = day => setState({ ...state, day });
  //confirm state.day <-- note to self
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
     //interview undefined??? 
    const interview = getInterview(state, appointment.interview)});
    
  
    
  useEffect(() => {
    Promise.all([
      axios.get(('/api/days')),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu" >
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          return (
            <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview} //undefined ?? 
          />
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
