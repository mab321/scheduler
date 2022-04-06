import React, { Fragment } from 'react'


import "./style.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';
export default function Appointment(props) {

   const EMPTY = "EMPTY";
   const SHOW = "SHOW";
   const CREATE = "CREATE";
   const SAVING = "SAVING";
   const CONFIRM = "CONFIRM";
   const DELETING = "DELETING";
   const EDIT = "EDIT";
   

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
           console.log("bookInterview",error);
        })

    }
    const DeleteInterview = () => {
       transition(DELETING, true);
       props.cancelInterview(props.id)
       .then(() => {
          transition(EMPTY);
       })
       .catch((error) => {
          console.log("DeleteInterview", error);
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
            onEdit={()=> console.log("editing")}
         />
        )} 
        {mode === CREATE && (
           <Form
            interviewers = {props.interviewers}
            onCancel={back}
            onSave={save} />
        )}
        {mode === SAVING && <Status message={"SAVING"}/>}
        {mode === CONFIRM && <Confirm  onConfirm={DeleteInterview} onCancel={() => transition(SHOW)}/>}
        {mode === DELETING && <Status message={"DELETING"}/>}
           
       </Fragment>
       </article>

   );
}