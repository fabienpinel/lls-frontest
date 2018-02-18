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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
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
            studentIdBeingEdited: 0,
            studentFirstnameBeingEdited: "",
            studentLastnameBeingEdited: "",
            editModalOpen: false,
            deleteModalOpen: false,
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

    /*
        MODAL display handlers
    */
    // Edit modal handlers
    handleEditModalOpen() {
        this.setState({ editModalOpen: true });
    }

    handleEditModalClose() {
        this.setState({ editModalOpen: false });
    }

    // Delete modal handlers
    handleDeleteModalClose() {
        this.setState({ deleteModalOpen: false });
    }
    handleDeleteModalOpen() {
        this.setState({ deleteModalOpen: true });
    }

    handleEditModalConfirm() {
        //save the edit
        this.props.callbackEditStudent(
            this.state.studentIdBeingEdited,
            this.state.studentFirstnameBeingEdited,
            this.state.studentLastnameBeingEdited);
        this.handleEditModalClose();
    }
    /*
        Form input changes
    */
    handleFirstnameChange = (event) => {
        this.setState({
            studentFirstnameBeingEdited: event.target.value,
        });
    };
    handleLastnameChange = (event) => {
        this.setState({
            studentLastnameBeingEdited: event.target.value,
        });
    };

    editStudent(studentid) {
        // show edit modal
        this.setState(
            {
                studentIdBeingEdited: studentid,
                studentFirstnameBeingEdited: this.props.studentList[studentid].firstname,
                studentLastnameBeingEdited: this.props.studentList[studentid].lastname
            });
        // show edit modal
        this.handleEditModalOpen();
    }
    deleteStudentRequested(studentid) {
        this.setState(
            {
                studentIdBeingEdited: studentid
            }
        );
        //show confirm modal
        this.handleDeleteModalOpen();
    }

    deleteStudent(studentid) {
        this.props.callbackDeleteStudent(studentid);
    }

    // rules the display list or grid
    handleIndexTabChange(value) {
        this.setState({
            slideIndex: value,
        });
    };
    // rules the size of the grid items
    handleSliderValueChange(event, value) {
        this.setState({
            sizePicture: value,
        });
    }
    render() {
        const deleteStudentActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.handleDeleteModalClose()}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onClick={() => {
                    this.deleteStudent(this.state.studentIdBeingEdited);
                    this.handleDeleteModalClose();
                }}
            />,
        ];

        const editStudentActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => { this.handleEditModalClose() }}
            />,
            <FlatButton
                label="Confirm"
                primary={true}
                keyboardFocused={true}
                onClick={() => { this.handleEditModalConfirm() }}
            />,
        ];

        // action buttons (common for both views)
        const actionButtons = (index, isWhiteTheme = false) => {
            return (
                <div>
                    <IconButton
                        iconClassName={isWhiteTheme ? 'material-icons white' : 'material-icons'}
                        tooltip="Edit student"
                        data-id={index}
                        onClick={() => { this.editStudent(index) }}
                    >
                        edit</IconButton>
                    &nbsp;
                <IconButton
                        iconClassName={isWhiteTheme ? 'material-icons white' : 'material-icons'}
                        tooltip="Delete student"
                        onClick={() => { this.deleteStudentRequested(index) }}
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

        //Grid View for students
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
                            title={student.firstname + " " + student.lastname}
                            cols={2}
                            rows={2}
                            style={{ cursor: 'pointer' }}
                            actionIcon={
                                // no need to display the action button when the profiles are very small
                                // when clicking on the picture they will be able to edit and delete
                                (this.state.sizePicture > 0.4) ? actionButtons(index, true) : null
                            }
                        >
                            <img
                                alt="student profile"
                                src={student.picture}
                                onClick={() => { this.editStudent(index) }} />
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
                <div>
                    <Dialog
                        title="Edit student"
                        actions={editStudentActions}
                        modal={false}
                        open={this.state.editModalOpen}
                        onRequestClose={() => { this.handleEditModalClose() }}
                    >
                        Please update student information and click Confirm to save or Cancel to delete any change done.
                        <div>
                            <TextField
                                hintText="Student's firstname"
                                floatingLabelText="Firstname"
                                value={this.state.studentFirstnameBeingEdited}
                                onChange={(event) => { this.handleFirstnameChange(event) }}

                            /><br />
                            <TextField
                                hintText="Student's lastname"
                                floatingLabelText="Lastname"
                                value={this.state.studentLastnameBeingEdited}
                                onChange={(event) => { this.handleLastnameChange(event) }}
                            />
                        </div>
                    </Dialog>
                    <Dialog
                        actions={deleteStudentActions}
                        modal={false}
                        open={this.state.deleteModalOpen}
                        onRequestClose={() => { this.handleDeleteModalClose() }}
                    >
                        Delete Student ({this.props.studentList[this.state.studentIdBeingEdited].firstname + " " + this.props.studentList[this.state.studentIdBeingEdited].lastname}) ?
                    </Dialog>
                </div>
            </section>
        );
    }
}

export default Classroom;
