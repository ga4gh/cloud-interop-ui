import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Spacer from '../common/Spacer';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';

class ScheduleForm extends Component {

    state = {
        frequency: "daily",
        dayOfWeek: "monday",
        dayOfMonth: "1",
        currentValues: {...this.props.currentValues}
    }

    constructor(props) {
        super(props);
        let empty = Object.entries(this.state.currentValues).length === 0;
        if (empty) {
            this.setEmptyCurrentValues();
        }
    }

    setEmptyCurrentValues = () => {
        let currentValues = {};
        // set blank name
        currentValues.name = "";
        // set empty parameters
        currentValues.parameters = {};
        this.props.plugin.inputs.forEach(input => {
            currentValues.parameters[input.key] = ""
        });
        // set default schedule
        currentValues.schedule = {
            frequency: "daily",
            timeOfDay: "09:00:00",
        }
        this.state.currentValues = currentValues;
        
    }

    inputStyles = {
        margin: 10
    }

    changeNameHandler = event => {
        let newState = {...this.state};
        newState.currentValues.name = event.target.value;
        this.setState({newState});
    }

    changeParameterHandler = (event, key) => {
        let newState = {...this.state};
        newState.currentValues.parameters[key] = event.target.value;
        this.setState({newState});
    }

    renderSingleInput = (input) => {
        let jsx = null;
        if (input.type == "string") {
            jsx = (
                <TextField
                    style={this.inputStyles}
                    label={input.key}
                    helperText={input.description}
                    value={this.state.currentValues.parameters[input.key]}
                    onChange={e => this.changeParameterHandler(e, input.key)}
                >
                </TextField>
            )
        } else if (input.type == "integer") {
            jsx = (
                <TextField
                    style={this.inputStyles}
                    label={input.key}
                    helperText={input.description}
                    type="number"
                    margin="normal"
                    value={this.state.currentValues.parameters[input.key]}
                    onChange={e => this.changeParameterHandler(e, input.key)}
                >
                </TextField>
            )
        }
        return jsx;
    }

    renderParameters = () => {
        return (
            <div>
                <p>Parameters:</p>
                {this.props.plugin.inputs.map((input, index) => (
                    this.renderSingleInput(input)
                ))}
            </div>
        )
    }

    renderFrequency = () => {
        const dayOfWeekChange = event => {
            this.setState({dayOfWeek: event.target.value});
        }

        const dayOfMonthChange = event => {
            this.setState({dayOfMonth: event.target.value})
        }

        const timeOfDayPicker = (
            <FormControl>
                <KeyboardTimePicker
                    style={this.inputStyles}
                    helperText="at"
                    inputProps={{
                        name: 'timeOfDay',
                        id: 'timeOfDay'
                    }}
                >
                </KeyboardTimePicker>
            </FormControl>
        )

        const dayOfWeekPicker = (
            <FormControl>
                <InputLabel htmlFor="dayOfWeek">
                    On:
                </InputLabel>
                <Select
                    style={this.inputStyles}
                    value={this.state.dayOfWeek}
                    onChange={dayOfWeekChange}
                    inputProps={{
                        name: 'dayOfWeek',
                        id: 'dayOfWeek'
                    }}
                >
                    <MenuItem key="0" value="monday">Monday</MenuItem>
                    <MenuItem key="1" value="tuesday">Tuesday</MenuItem>
                    <MenuItem key="2" value="wednesday">Wednesday</MenuItem>
                    <MenuItem key="3" value="thursday">Thursday</MenuItem>
                    <MenuItem key="4" value="friday">Friday</MenuItem>
                    <MenuItem key="5" value="saturday">Saturday</MenuItem>
                    <MenuItem key="6" value="sunday">Sunday</MenuItem>
                </Select>
            </FormControl>
        )

        const dayOfMonthPicker = (
            <FormControl>
                <InputLabel htmlFor="dayOfMonth">
                    On the:
                </InputLabel>
                <Select
                    style={this.inputStyles}
                    value={this.state.dayOfMonth}
                    onChange={dayOfMonthChange}
                    inputProps={{
                        name: 'dayOfMonth',
                        id: 'dayOfMonth'
                    }}
                >
                    {[...Array(31).keys()].map((d, index) => (
                        <MenuItem key={d+1} value={d+1}>{d+1}</MenuItem>    
                    ))}
                </Select>
            </FormControl>
        )

        let jsx = null;
        if (this.state.frequency == "daily") {
            jsx = timeOfDayPicker;
        } else if (this.state.frequency == "weekly") {
            jsx = (
                <span>
                    {dayOfWeekPicker}
                    {timeOfDayPicker}
                </span>
            )
        } else if (this.state.frequency == "monthly") {
            jsx = (
                <span>
                    {dayOfMonthPicker}
                    {timeOfDayPicker}
                </span>
            )
        }
        return jsx;
    }

    renderSchedule = () => {

        const frequencyChange = event => {
            this.setState({frequency: event.target.value});
        }

        return (
            <div>
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <FormControl>
                        <InputLabel htmlFor="frequency">
                            Schedule this test to run:
                        </InputLabel>
                        <Select
                            style={{marginRight: 100, marginTop: 10}}
                            value={this.state.frequency}
                            onChange={frequencyChange}
                            inputProps={{
                                name: 'frequency',
                                id: 'frequency'
                            }}
                        >
                            <MenuItem key="0" value="daily">Once a day</MenuItem>
                            <MenuItem key="1" value="weekly">Once a week</MenuItem>
                            <MenuItem key="2" value="monthly">Once a month</MenuItem>
                            <MenuItem key="3" value="once">Only once</MenuItem>
                        </Select>
                        </FormControl>
                        {this.renderFrequency()}
                    </MuiPickersUtilsProvider>
                </div>
            </div>   
        )
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                fullScreen={true}
            >
                <Container>
                    <div>
                        <DialogTitle>
                            Create New Test Schedule for Plugin: {this.props.plugin.name}
                        </DialogTitle>
                        <Spacer />
                        <DialogContent>
                            <DialogContentText>
                                <TextField
                                    style={this.inputStyles}
                                    label="schedule name"
                                    helperText="name this test schedule"
                                    value={this.state.currentValues.name}
                                    onChange={this.changeNameHandler}
                                >
                                </TextField>
                                <Spacer />
                                {this.renderParameters()}
                                <Spacer />
                                {this.renderSchedule()}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => {alert("Submitted!")}}
                                color="primary"
                            >
                                Submit
                            </Button>
                            <Button
                                onClick={this.props.handleClose}
                                color="primary"
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </div>
                </Container>
            </Dialog>   
        )
    }
}

export default ScheduleForm;
