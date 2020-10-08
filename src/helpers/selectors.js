/* returns an array of appointments for that day*/
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

/* returns an array of interviews for that day*/
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

/* returns an interview object*/
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

