import React, { Component } from 'react';
import './classroom.css'; 

class Classroom extends Component {
    constructor() {
        super();
        this.state = {
            students : [
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
        };
    }
    render() {
        return (
            <section className="classroom">
                    <div className={'student-wrapper'}>
                        {this.state.students.map(function (student, index) {
                            return <li
                                id={"student-" + index}
                                key={"student-" + index}
                            >
                            {student.firstname+" "+student.lastname}
                            </li>;
                        })}

                    </div>
                </section>
        );
    }
}

export default Classroom;
