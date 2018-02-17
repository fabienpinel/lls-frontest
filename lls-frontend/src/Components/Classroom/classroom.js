import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './classroom.css';

class Classroom extends Component {
    constructor() {
        super();
        this.state = {
            tableConfig: {
                fixedHeader: false,
                fixedFooter: false,
                stripedRows: true,
                showRowHover: true,
                selectable: false,
                multiSelectable: false,
                enableSelectAll: false,
                deselectOnClickaway: true,
                showCheckboxes: false
            }
        };
    }
    render() {
        return (
            <section className="classroom">
            <Grid fluid>
        <Row>
          <Col mdOffset={2} s={12} md={8}>
                <div className={'student-wrapper'}>
                <Paper depth={2}>
                    <Table
                        fixedHeader={this.state.tableConfig.fixedHeader}
                        fixedFooter={this.state.tableConfig.fixedFooter}
                        selectable={this.state.tableConfig.selectable}
                        multiSelectable={this.state.tableConfig.multiSelectable}
                    >
                        <TableHeader
                            displaySelectAll={this.state.tableConfig.showCheckboxes}
                            adjustForCheckbox={this.state.tableConfig.showCheckboxes}
                            enableSelectAll={this.state.tableConfig.enableSelectAll}
                        >
                            <TableRow>
                                <TableHeaderColumn 
                                colSpan="2" 
                                tooltip="List of all the students from this classroom" 
                                style={{ textAlign: 'center' }}>
                                    List of students
              </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn tooltip="ID of the student">ID</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={this.state.tableConfig.showCheckboxes}
                            deselectOnClickaway={this.state.tableConfig.deselectOnClickaway}
                            showRowHover={this.state.tableConfig.showRowHover}
                            stripedRows={this.state.tableConfig.stripedRows}
                        >
                            {this.props.studentList.map((student, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>{index}</TableRowColumn>
                                    <TableRowColumn>{student.firstname + " " + student.lastname}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </Paper>
                </div>
          </Col>
        </Row>
      </Grid>
            </section>
        );
    }
}

export default Classroom;
