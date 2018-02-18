import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Just unit testing App for now.
jest.mock('./Components/Classroom/classroom.js', () => 'mock-classroom')
jest.mock('./Components/Footer/footer.js', () => 'mock-footer')

let app;
beforeEach(() => {
  const div = document.createElement('div');
  app = ReactDOM.render(<App />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('App init with data', () => {
  expect(app.state).toBeDefined();
  expect(app.state.students).toBeDefined();
  expect(app.state.students.length).toEqual(5);
});

test('DELETE entry from array properly', () => {
  let tableToTest = ["value1", "value2"];
  let resultToTest = app.deleteEntryFromArray(tableToTest, 0);
  expect(resultToTest).toEqual(["value2"]);
});

test('ADD 1 new student', () => {
  expect(app.state.students.length).toEqual(5);
  app.onAddStudentRequested("Fabien", "Pinel");
  const size = app.state.students.length;
  expect(size).toEqual(6);
  expect(app.state.students[size - 1].firstname).toEqual("Fabien");
  expect(app.state.students[size - 1].lastname).toEqual("Pinel");
});

test('EDIT first student of the list', () => {
  const dummyFirstname = "TEST_FIRSTNAME";
  const dummyLastname = "TEST_LASTNAME";

  app.onEditStudentRequested(0, dummyFirstname, dummyLastname);
  expect(app.state.students[0].firstname).toEqual(dummyFirstname);
  expect(app.state.students[0].lastname).toEqual(dummyLastname);
});

test('add, edit, delete', () => {
  expect(app.state.students.length).toEqual(5);
  // ADD
  app.onAddStudentRequested("Fabien", "Pinel");
  expect(app.state.students.length).toEqual(6);
  const fabienID = app.state.students.length - 1;

  // EDIT
  app.onEditStudentRequested(fabienID, "FABIEN", "PINEL");
  expect(app.state.students.length).toEqual(6);
  expect(app.state.students[fabienID].firstname).toEqual("FABIEN");
  expect(app.state.students[fabienID].lastname).toEqual("PINEL");

  //DELETE
  app.onDeleteStudentRequested(fabienID);
  expect(app.state.students.length).toEqual(5);



});