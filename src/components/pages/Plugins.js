import Axios from 'axios';
import React, {Component} from 'react';
import {
    Box,
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@material-ui/core';
import SectionTitle from '../common/SectionTitle';
import Spacer from '../common/Spacer';
import Title from '../common/Title';

class Plugins extends Component {

    state = {
        plugins: []
    }

    constructor() {
        super();
        this.setPlugins();
    }

    setPlugins = () => {
        Axios
            .get("/plugins/get")
            .then(response => {
                this.setState({plugins: response.data});
            })
    }

    deletePluginHandler = (pluginId) => {
        Axios
            .delete(`/plugins/${pluginId}`)
            .then(response => this.setPlugins());
    }

    newConfigurationButton = (plugin, index) => {
        return (
            <span>
                <Button           
                    variant="contained" 
                    color="primary"
                    component="a"
                    href={`/configurations/new?pluginId=${plugin._id}`}
                >
                    New Configuration
                </Button>
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
                    <TableCell align="right">Create New Test Configuration from Plugin</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.plugins.map((plugin, index) => (
                        <TableRow key={plugin.name}>
                            <TableCell component="th" scope="row">
                                {plugin.name}
                            </TableCell>

                            <TableCell align="left">{plugin.description}</TableCell>

                            <TableCell align="right">
                                {this.newConfigurationButton(plugin, index)}
                            </TableCell>

                            <TableCell align="right">
                                <Button           
                                    variant="contained"
                                    color="default"
                                    component="a"
                                    href={`/plugins/${plugin._id}/edit`}
                                >
                                    Edit
                                </Button>
                            </TableCell>

                            <TableCell align="right">
                                <Button
                                    variant="contained" 
                                    color="secondary"
                                    onClick={this.deletePluginHandler.bind(this, plugin._id)}
                                >
                                    Delete
                                </Button>
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
                    <Title title="Plugins" />
                    <Spacer />
                    <Button
                        component="a"
                        href="/plugins/new"
                        variant="contained"
                        color="primary"
                    >
                        Add New Plugin
                    </Button>
                    <Spacer />
                    <SectionTitle sectionTitle="Installed Plugins" />
                    {this.installedPlugins()}
                </Container>
            </Box>
        )
    }
}

export default Plugins;
