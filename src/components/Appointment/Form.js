import React, { useState } from 'react'
import Button from "../Button.js"
import InterviewerList from "../InterviewerList.js"


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = function () {
    setName("");
    setInterviewer(null);
  }
  const cancel = function() {
    reset();
    props.onCancel();
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
        />
      </form>
      <InterviewerList setInterviewer={setInterviewer} interviewers={props.interviewers} interviewer={interviewer}  />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
      <Button danger onClick={() => cancel()}>Cancel</Button>
      <Button confirm onClick={props.onSave}>Save</Button>
      </section>
    </section>
  </main>
  );
}