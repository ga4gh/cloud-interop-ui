import React, {Component} from 'react';
import {
    Box,
    Container,
    Typography,
    Table,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@material-ui/core';
import Spacer from '../common/Spacer';
import ScheduleForm from '../forms/ScheduleForm';

class Plugins extends Component {

    initializeActiveModal = () => {
        return this.props.plugins.map(plugin => false);
    }

    state = {
        // activeModal: this.initializeActiveModal()
    }

    openModal = (index) => {
        let newState = {activeModal: this.initializeActiveModal()};
        newState.activeModal[index] = true;
        this.setState(newState);
    }

    closeModal = (index) => {
        this.setState({activeModal: this.initializeActiveModal()});
    }

    newScheduleButton = (pluginJson, index) => {
        return (
            <span>
                <Button 
                    onClick={() => {this.openModal(index)}}
                    variant="contained" 
                    color="primary"
                >
                    New Schedule
                </Button>
                <ScheduleForm
                    open={this.state.activeModal[index]}
                    handleClose={() => {this.closeModal(index)}}
                    plugin={pluginJson}
                    currentValues={{}}
                >
                </ScheduleForm>
            </span>
        )
    }

    installedPlugins = () => {
        return (
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="right">Create New Test Schedule from Plugin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.plugins.map((plugin, index) => (
                        <TableRow key={plugin.name}>
                            <TableCell component="th" scope="row">
                            {plugin.name}
                            </TableCell>
                            <TableCell align="left">{plugin.description}</TableCell>
                            <TableCell align="right">
                                {this.newScheduleButton(plugin, index)}
                            </TableCell>
                        </TableRow>
                    ))}   
                </TableBody>
              </Table>
            </Paper>
        );
    }

    render() {
        return (
            <Box>
                <Container>
                    <Typography variant="h1">
                        Plugins
                    </Typography>
                    <Spacer />
                    <Button component="a" href="/plugins/new" variant="contained" color="primary">
                        Add New Plugin
                    </Button>
                    <Spacer />
                    <p>Installed Plugins:</p>
                    {/*this.installedPlugins()*/}
                </Container>
            </Box>
        )
    }
}

export default Plugins;
