import React, { Fragment } from 'react'


import "./style.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';
export default function Appointment(props) {

   const EMPTY = "EMPTY";
   const SHOW = "SHOW";
   const CREATE = "CREATE";
   const SAVING = "SAVING";
   const CONFIRM = "CONFIRM";
   const DELETING = "DELETING";
   const EDIT = "EDIT";
   const ERROR_SAVE = "ERROR_SAVE";
   const ERROR_DELETE = "ERROR_DELETE";


   const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

    const save = function(name, interviewer) {
      const interview = {
         student: name,
         interviewer
       };
       transition(SAVING);
       props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch((error) => {
           transition(ERROR_SAVE, true);
        })

    }
    const DeleteInterview = (appointmentID) => {
       transition(DELETING, true);
       props.cancelInterview(props.id)
       .then(() => {
          transition(EMPTY);
       })
       .catch((error) => {
          console.log("Could not delete appointment error", error);
          transition(ERROR_DELETE, true);
       })

    }

  


   return (
    <article className="appointment">
       <Header time={props.time} />
       <Fragment>
       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
       {mode === SHOW && (
         <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={()=> transition(EDIT)}
         />
        )} 
        {mode === EDIT && (
           <Form 
           student ={props.interview.student}
           interviewer ={props.interview.interviewer.id}
           interviewers = {props.interviewers}
           onCancel={back}
           onSave={save}
            />
        )}
        {mode === CREATE && (
           <Form
            interviewers = {props.interviewers}
            onCancel={back}
            onSave={save} />
        )}
        {mode === SAVING && <Status message={"SAVING"}/>}
        {mode === CONFIRM && <Confirm  onConfirm={() => DeleteInterview(props.id)} onCancel={() => transition(SHOW)}/>}
        {mode === DELETING && <Status message={"DELETING"}/>}
        {mode === ERROR_SAVE && (
        <Error
         message={"Server could not save appointment"}
          onClose={back}/>)}

        {mode === ERROR_DELETE && (
        <Error 
        message={"Server could not delete appointment"} 
        onClose={back}/>)}
           
       </Fragment>
       </article>

   );
}