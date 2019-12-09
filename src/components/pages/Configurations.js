import React, {Component} from 'react';
import Axios from 'axios';
import {
    Box,
    Container,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';

import ConfigurationForm from '../forms/ConfigurationForm';
import SectionTitle from '../common/SectionTitle';
import Spacer from '../common/Spacer';
import Title from '../common/Title';

class Configurations extends Component {

    state = {
        configurations: []
    }

    constructor() {
        super();
        this.setConfigurations();
    }

    setConfigurations = () => {
        Axios
            .get("/configurations/get")
            .then(response => {
                this.setState({configurations: response.data});
            })
    }

    deleteConfigurationHandler = (configurationId) => {
        Axios
            .delete(`/configurations/${configurationId}`)
            .then(response => this.setConfigurations());
    }

    installedConfigurations() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Plugin</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.configurations.map((configuration, index) => (
                            <TableRow key={configuration.name}>
                                <TableCell component="th" scope="row">
                                    {configuration.name}
                                </TableCell>
                                
                                <TableCell align="left">
                                    {configuration.pluginId}
                                </TableCell>

                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="default"
                                    >
                                        Edit
                                    </Button>
                                </TableCell>

                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.deleteConfigurationHandler.bind(this, configuration._id)}
                                    >
                                        Delete
                                    </Button>
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
            <Box>
                <Container>
                    <Title title="Configurations" />
                    <Spacer />
                    <Button component="a" href="/configurations/new" variant="contained" color="primary">
                        Add New Configuration
                    </Button>
                    <Spacer />
                    <SectionTitle sectionTitle="Current Configurations" />
                    {this.installedConfigurations()}
                </Container>
            </Box>
        )
    }
}

export default Configurations;
