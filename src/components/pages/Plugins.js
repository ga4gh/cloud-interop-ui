import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Spacer from '../Spacer';
import ScheduleForm from '../forms/ScheduleForm';

class Plugins extends Component {

    initializeActiveModal = () => {
        return this.props.plugins.map(plugin => false);
    }

    state = {
        activeModal: this.initializeActiveModal()
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
            <Container>
                <Typography variant="h1">
                    Plugins
                </Typography>
                <Spacer />
                <Button variant="contained" color="primary">
                    Add New Plugin
                </Button>
                <Spacer />
                <p>Installed Plugins:</p>
                {this.installedPlugins()}
            </Container>
        )
    }
}

export default Plugins;
