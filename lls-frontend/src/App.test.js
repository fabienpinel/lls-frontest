import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Just unit testing App for now.
jest.mock('./Components/Classroom/classroom.js', () => 'mock-classroom')

let app;
beforeEach(() => {
  const div = document.createElement('div');
  app  = ReactDOM.render(<App />, div);
});

//Dummy test 
test('Absolute value of -2 is 2', () => {
  expect(Math.abs(-2)).toBe(2);
});
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('delete entry from array properly', () => {
  let tableToTest = ["value1", "value2"];
  let resultToTest = app.deleteEntryFromArray(tableToTest, 0);
  expect(resultToTest).toEqual(["value2"]);
});


test('App init with data', () => {
  expect(app.state).toBeDefined();
  expect(app.state.students).toBeDefined();
  expect(app.state.students.length).toEqual(5);
});

