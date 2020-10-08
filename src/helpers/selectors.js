// import React from "react";
// import Application from "../components/Application"

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   }, 
//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };

//... returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0){
    return [];
  } 
  const filteredDay = state.days.filter(a => a.name === day);
  if (filteredDay.length === 0) {
    return [];
  }
    let corrAppArr = (filteredDay[0]).appointments;
    let filter = corrAppArr.map(x => state.appointments[x]);
    
  return filter;
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  
  const filteredDay = state.days.filter(a => a.name === day);
  
  if (filteredDay.length === 0) {
    return [];
  }
  let corrIntArr = (filteredDay[0]).interviewers;
  let filter = corrIntArr.map(x => state.interviewers[x]);
  
  return filter;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  } else {
    for (const a in state.interviewers) {
      if (interview.interviewer == a) {
        interview.interviewer = state.interviewers[a];
      }
    }
  }
  return interview;
}

