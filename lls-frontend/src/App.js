import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Classroom from './Components/Classroom/classroom';
import Footer from './Components/Footer/footer';
import './App.css';

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
        }
      ]
    }
  }

  // Delete
  onDeleteStudentRequested(studentid) {
    this.setState(this.deleteEntryFromArray(this.state.students, studentid));
  }

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

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="Classroom manager"
            iconClassNameRight="muidocs-icon-class"
          />
          <br />
          <Classroom
            studentList={this.state.students}
            callbackDeleteStudent={(studentid) => this.onDeleteStudentRequested(studentid)}
            callbackEditStudent={
              (studentid, newStudentFirstname, newStudentLastname) => this.onEditStudentRequested(studentid, newStudentFirstname, newStudentLastname)
              }/>
          <br />
        <Footer />
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
