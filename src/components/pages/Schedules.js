import React, {Component} from 'react';
import Axios from 'axios';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Spacer from '../Spacer';
import ScheduleForm from '../forms/ScheduleForm';
import {
    Button, Paper, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core'

class Schedules extends Component {

    state = {
        activeForm: []
    }

    constructor(props) {
        super(props);
        this.state.activeForm = this.initializeActiveForm();
        console.log("done the constructor");
    }

    initializeActiveForm = () => {
        return this.props.schedules.map(schedule => false)   
    }

    openForm = index => {
        let newState = {activeForm: this.initializeActiveForm()};
        newState.activeForm[index] = true;
        this.setState(newState);
    }
    closeForm = index => {
        this.setState({activeForm: this.initializeActiveForm()})
    }

    formatSchedule = scheduleJson => {
        let freq = scheduleJson.frequency;
        let formatted = freq + " "
        if (freq === "weekly") {
            formatted += "on " + scheduleJson.dayOfWeek + " "
        }
        formatted += "at " + scheduleJson.timeOfDay;
        return formatted;
    }

    editButton = (schedule, index) => {
        return (
            <span>
                <Button
                    onClick={() => {this.openForm(index)}}
                    variant="contained"
                    color="primary"
                >
                    Edit
                </Button>
                <ScheduleForm 
                    open={this.state.activeForm[index]}
                    handleClose={() => {this.closeForm(index)}}
                    plugin={this.props.pluginsMap[schedule.name]}
                    currentValues={schedule}
                >
                </ScheduleForm>
            </span>
        )
    }

    deleteButton = (schedule, index) => {
        return (
            <Button
                onClick={() => {alert("not implemented")}}
                variant="contained"
                color="secondary"
            >
                Delete
            </Button>
        )
    }

    installedSchedules() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Schedule Name</TableCell>
                            <TableCell align="left">Plugin</TableCell>
                            <TableCell align="left">Runs</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.schedules.map((schedule, index) => (
                            <TableRow key={schedule.name}>
                                <TableCell component="th" scope="row">
                                    {schedule.name}
                                </TableCell>
                                <TableCell align="left">
                                    {schedule.plugin}
                                </TableCell>
                                <TableCell align="left">
                                    {this.formatSchedule(schedule.schedule)}
                                </TableCell>
                                <TableCell align="right">
                                    {this.editButton(schedule, index)}
                                </TableCell>
                                <TableCell align="right">
                                    {this.deleteButton(schedule, index)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    render() {
        return (
            <Container>
                <Typography variant="h1">
                    Schedules
                </Typography>
                <Spacer />
                <p>Schedules:</p>
                {this.installedSchedules()}
            </Container>
        )
    }
}

export default Schedules;
