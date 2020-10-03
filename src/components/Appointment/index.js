import React from 'react'
import "./styles.scss"
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import Form from "./Form.js"
import Status from "./Status"
import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);
  // console.log({mode, transition, back})
  
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function deleteAppointment() {
    transition(DELETING);
    console.log(props)
    props.deleteInterview(props.id).then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header id={props.id} className="appointment:last-of-type" time={props.time}/>  
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => deleteAppointment()}
        />
      )}
      {mode === SAVING && <Status message="Saving - Please Wait our Server Sucks"/>}
      {mode === DELETING && <Status message="Deleting - Please Wait our Server Sucks"/>}
      {mode === CREATE && 
      <Form interviewers = {props.interviewers} 
      onCancel={() => back()}
      onSave={save}
      />}
    </article>
  );
}