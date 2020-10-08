import React from "react";

import { render, act, cleanup, waitForElement, fireEvent, queryByText, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"))
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);
  // await waitForElement(() => getByText(container, "Monday"))
  // fireEvent.click(getByText(container, "Monday"));
  

  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  const appointments = getAllByTestId(container, "appointment");
  
  const appointment = appointments[0];
  

  fireEvent.click(getByAltText(appointment, "Add"));
  
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  
  
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);
 
  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[1];
  

  fireEvent.click(getByAltText(appointment, "Delete"));
  expect(getByText(appointment, "Are you sure you want to cancel that interview?")).toBeInTheDocument();
  
  fireEvent.click(queryByText(appointment, "Yes"));

  expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  await waitForElement(() => getByAltText(appointment, "Add"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  const { container } = render(<Application />);
 
  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[1];
  

  fireEvent.click(getByAltText(appointment, "Edit"));
  expect(getByText(appointment, "Interviewer")).toBeInTheDocument();
  
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(queryByText(appointment, "Save"));
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
  await waitForElement(() => getByText(appointment, "Sylvia Palmer"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    
});

it("shows the save error when failing to save an appointment", async () => {
  const { container } = render(<Application />);
 
  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[1];
  axios.put.mockRejectedValueOnce();

  fireEvent.click(getByAltText(appointment, "Edit"));
  expect(getByText(appointment, "Interviewer")).toBeInTheDocument();
  
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(queryByText(appointment, "Save"));
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  await waitForElement(() => getByText(appointment, "There was an Error when Saving :("));
  expect(getByText(appointment, "There was an Error when Saving :(")).toBeInTheDocument();
  
});

it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();
  const { container } = render(<Application />);
 
  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[1];
  

  fireEvent.click(getByAltText(appointment, "Delete"));
  expect(getByText(appointment, "Are you sure you want to cancel that interview?")).toBeInTheDocument();
  
  fireEvent.click(queryByText(appointment, "Yes"));
  
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
  await waitForElement(() => getByText(appointment, "There was an Error when Deleting :("));
  
  expect(getByText(appointment, "There was an Error when Deleting :(")).toBeInTheDocument();
  
});