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
        },
        {
            firstname: "Queen",
            lastname: "Mother",
        },
        {
            firstname: "Winston",
            lastname: "Churchill",
        },
        {
            firstname: "Duke",
            lastname: "of Edimburgh",
        },
        {
            firstname: "Princess",
            lastname: "Diana",
        }
    ]
    }
  }
  onDeleteStudentRequested(studentid){
    this.setState(this.state.students.splice(studentid,1));
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
