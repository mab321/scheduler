export function getAppointmentsForDay(state, day) {
   const filteredDay = state.days.filter(item => item.name === day);
    let result =[]
   if(filteredDay.length > 0) {
     console.log(filteredDay);
     result = filteredDay[0].appointments.map(elm => state.appointments[elm]);
     
   }

   return result;
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewerCollection = state.interviewers;
  const interviewer = interviewerCollection[interviewerId];

  const interviewContents = {
    ...interview,
    interviewer
  };

  return interviewContents;

}
