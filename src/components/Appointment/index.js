import React from 'react'
import "./styles.scss"
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import Form from "./Form.js"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);
  // console.log({mode, transition, back})
  
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  function edit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.editInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  const requestDelete = () => {
    transition(CONFIRM);
  }
  
  function requestEdit () {
    transition(EDIT);
  }

  function deleteAppointment() {
    (props.deleteInterview(props.id))
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header id={props.id} className="appointment:last-of-type" time={props.time}/>  
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to cancel that interview?" 
        onCancel={() => back()} onConfirm={() => {transition(DELETING, true); deleteAppointment()}} />}
      {mode === SHOW && (
        <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => requestDelete()}
      onEdit={() => requestEdit()}
        />
      )}
      {mode === SAVING && <Status message="Saving - Please Wait our Server Sucks"/>}
      {mode === DELETING && <Status message="Deleting- Please Wait our Server Sucks"/>}
      {mode === ERROR_SAVE && <Error message="There was an Error when Saving :(" onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="There was an Error when Deleting :(" onClose={() => back()} />}
      {mode === CREATE && 
      <Form interviewers = {props.interviewers} 
      onCancel={() => back()}
      onSave={save}
      />}
      {mode === EDIT && 
      <Form interviewers = {props.interviewers} 
      onCancel={() => back()}
      onSave={edit}
      interviewer={props.interview.interviewer.id}
      name={props.interview.student}
      />}
    </article>
  );
}