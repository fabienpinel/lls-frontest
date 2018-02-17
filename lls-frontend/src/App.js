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
            firstname: "Jean",
            lastname: "Macé",
        },
        {
            firstname: "Jean",
            lastname: "Macé2",
        },
        {
            firstname: "Jean",
            lastname: "Macé3",
        },
        {
            firstname: "Jean",
            lastname: "Macé4",
        }
    ]
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="Classroom manager"
            iconClassNameRight="muidocs-icon-class"
          />
          <Classroom studentList={this.state.students}/>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
