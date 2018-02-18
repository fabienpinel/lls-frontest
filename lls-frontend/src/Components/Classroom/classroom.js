import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Slider from 'material-ui/Slider';
import './classroom.css';

// Style to inject in component to override inline css
// allow us to avoid the use of !important in CSS
const rightAlignedInlineStyleOverride = {
    rightAligned: {
        textAlign: 'right'
    }
};

class Classroom extends Component {

    constructor() {
        super();
        this.state = {
            slideIndex: 0,
            sizePicture: 0.5,
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
    editStudent(studentid) {
        // show edit modal
        console.log('edit student', studentid);
    }
    deleteStudent(studentid) {
        //show confirm modal
        console.log('delete student', studentid);
        this.props.callbackDeleteStudent(studentid);
    }
    handleIndexTabChange(value) {
        this.setState({
            slideIndex: value,
        });
    };
    handleSliderValueChange(event, value) {
        this.setState({
            sizePicture: value,
        });
    }
    render() {
        // action buttons (common for both views)
        const actionButtons = (index, isWhiteTheme = false) => {
            return (
                <div>
                    <IconButton
                        iconClassName={isWhiteTheme? 'material-icons white': 'material-icons'}
                        tooltip="Edit student"
                        data-id={index}
                        onClick={() => { this.editStudent(index) }}
                    >
                        edit</IconButton>
                    &nbsp;
                <IconButton
                        iconClassName={isWhiteTheme? 'material-icons white': 'material-icons'}
                        tooltip="Delete student"
                        onClick={() => { this.deleteStudent(index) }}
                    >
                        delete</IconButton>
                </div>
            );
        };
        //List view for students
        const listView = (<Table
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
                        colSpan="7"
                        tooltip="List of all the students from this classroom"
                        style={{ textAlign: 'center' }}>
                        List of students
    </TableHeaderColumn>
                </TableRow>
                <TableRow>
                    <TableHeaderColumn colSpan={1} tooltip="ID of the student">ID</TableHeaderColumn>
                    <TableHeaderColumn colSpan={3} tooltip="Name">Name</TableHeaderColumn>
                    <TableHeaderColumn colSpan={3} tooltip="Actions" style={rightAlignedInlineStyleOverride.rightAligned}>Actions</TableHeaderColumn>
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
                        <TableRowColumn colSpan={1}>{index}</TableRowColumn>
                        <TableRowColumn colSpan={3}>{student.firstname + " " + student.lastname}</TableRowColumn>
                        <TableRowColumn colSpan={3} style={rightAlignedInlineStyleOverride.rightAligned}>
                            {actionButtons(index)}
                        </TableRowColumn>
                    </TableRow>
                ))}
            </TableBody>
        </Table>);

        //Grid VIew for students
        const gridView = (
            <div >
                <div className="slider-container">
                    <h1>Taille des photos</h1>
                    <Slider
                        defaultValue={this.state.sizePicture}
                        onChange={(event, value) => { this.handleSliderValueChange(event, value) }} />
                </div>
                <GridList
                    cellHeight={this.state.sizePicture * 300}
                    cols={2 / this.state.sizePicture}
                >
                    <Subheader>List of students</Subheader>
                    {this.props.studentList.map((student, index) => (
                        <GridTile
                            className="gridtile"
                            key={student.firstname + "" + student.lastname}
                            title={student.firstname + "" + student.lastname}
                            cols={2}
                            rows={2}
                            style={{ cursor: 'pointer' }}
                            onClick={() => { this.editStudent(index) }}
                            actionIcon={
                                // no need to display the action button when the profiles are very small
                                // when clicking on the picture they will be able to edit and delete
                                (this.state.sizePicture > 0.4) ? actionButtons(index, true) : null
                            }
                        >
                            <img
                                alt="student profile"
                                src={student.picture} />
                        </GridTile>
                    ))}
                </GridList>
            </div>
        );


        return (
            <section className="classroom">
                <Grid fluid>
                    <Row>
                        <Col mdOffset={1} lgOffset={2} s={12} md={10} lg={8}>

                            <div className={'student-wrapper'}>
                                <Paper depth={2}>
                                    <Tabs
                                        value={this.state.slideIndex}
                                        onChange={(value) => { this.handleIndexTabChange(value) }}>
                                        <Tab
                                            icon={<FontIcon className="material-icons">dehaze</FontIcon>}
                                            label="LIST"
                                            value={0}
                                        />
                                        <Tab
                                            icon={<FontIcon className="material-icons">collections</FontIcon>}
                                            label="PICTURES"
                                            value={1}
                                        />
                                    </Tabs>

                                    {(this.state.slideIndex === 0) ? listView : gridView}
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
