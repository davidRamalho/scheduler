import React, { useState } from 'react'
import Button from "../Button.js"
import InterviewerList from "../InterviewerList.js"


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const reset = function () {
    setName("");
    setInterviewer(null);
  }
  const cancel = function() {
    reset();
    props.onCancel();
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }
  
  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form onSubmit={event => event.preventDefault()} autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name={props.name}
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(event) => setName(event.target.value)}

          /*
            This must be a controlled component
          */
          data-testid="student-name-input"
        />
        <section className="appointment__validation">{error}</section>
      </form>
      <InterviewerList setInterviewer={setInterviewer} interviewers={props.interviewers} interviewer={interviewer}  />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
      <Button danger onClick={() => cancel()}>Cancel</Button>
      <Button confirm onClick={() => props.onSave(name, interviewer), () => validate()}>Save</Button>
      </section>
    </section>
  </main>
  );
}