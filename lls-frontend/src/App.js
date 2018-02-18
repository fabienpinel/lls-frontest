import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Classroom from './Components/Classroom/classroom';
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

  onDeleteStudentRequested(studentid){
    this.setState(this.deleteEntryFromArray(this.state.students, studentid));
  }

  deleteEntryFromArray(array, entryid){
    array.splice(entryid, 1);
    return array;
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="Classroom manager"
            iconClassNameRight="muidocs-icon-class"
          />
          <Classroom 
          studentList={this.state.students}
          callbackDeleteStudent={(studentid) => this.onDeleteStudentRequested(studentid) }/>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
