import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Classroom from './Components/Classroom/classroom';
import Footer from './Components/Footer/footer';
import './App.css';

// Overriding the standard theme by a softer blue color
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "rgb(56, 128, 220)",
  }
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      students: [
        {
          firstname: "Queen",
          lastname: "Elisabeth",
          picture: "./standard-pic.png"
        },
        {
          firstname: "Queen",
          lastname: "Mother",
          picture: "./standard-pic.png"
        },
        {
          firstname: "Winston",
          lastname: "Churchill",
          picture: "./standard-pic.png"
        },
        {
          firstname: "Duke",
          lastname: "of Edimburgh",
          picture: "./standard-pic.png"
        },
        {
          firstname: "Princess",
          lastname: "Diana",
          picture: "./standard-pic.png"
        },
        {
          firstname: "Prince",
          lastname: "William",
          picture: "./standard-pic.png"
        },
        {
          firstname: "Prince",
          lastname: "Harry",
          picture: "./standard-pic.png"
        }
      ]
    }
  }

  // Delete
  onDeleteStudentRequested(studentid) {
    this.setState(this.deleteEntryFromArray(this.state.students, studentid));
  }
  // Delete utils
  deleteEntryFromArray(array, entryid) {
    array.splice(entryid, 1);
    return array;
  }

  // Edit
  onEditStudentRequested(studentid, newStudentFirstname, newStudentLastname) {
    let allTheStudents = this.state.students;
    allTheStudents[studentid].firstname = newStudentFirstname;
    allTheStudents[studentid].lastname = newStudentLastname;
    this.setState(
      { students: allTheStudents }
    )
  }

  // Add
  onAddStudentRequested(newStudentFirstname, newStudentLastname) {
    let allTheStudents = this.state.students;
    allTheStudents.push({
      firstname: newStudentFirstname,
      lastname: newStudentLastname,
      picture: "./standard-pic.png"
    });
    this.setState(
      { students: allTheStudents }
    );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <AppBar
            title="Classroom manager"
            iconClassNameRight="muidocs-icon-class"
          />
          <br />
          <Classroom
            studentList={this.state.students}
            callbackDeleteStudent={(studentid) => this.onDeleteStudentRequested(studentid)}
            callbackAddStudent={
              (newStudentFirstname, newStudentLastname) => this.onAddStudentRequested(newStudentFirstname, newStudentLastname)
            }
            callbackEditStudent={
              (studentid, newStudentFirstname, newStudentLastname) => this.onEditStudentRequested(studentid, newStudentFirstname, newStudentLastname)
            } />
          <br />
          <Footer />
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
