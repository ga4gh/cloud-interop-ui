import React, {Component} from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormGroup,
    FormHelperText,
    Input,
    InputLabel,
    Select
} from '@material-ui/core';
import queryString from 'query-string';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Spacer from '../common/Spacer';
import MenuItem from '@material-ui/core/MenuItem';
import {MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import SectionTitle from '../common/SectionTitle';
import Title from '../common/Title';
import Axios from 'axios';

class ConfigurationForm extends Component {

    state = {
        editConfigurationId: null,
        formAction: "/configurations",
        formMethod: "POST",
        plugins: [],
        pluginsDict: {},
        activePlugin: undefined,
        name: "",
        pluginId: "",
        parameters: {},
        schedule: {
            cronString: ""
        }
    }

    constructor(props) {
        super(props);
        this.setPlugins().then(response => {
            let params = queryString.parse(this.props.location.search);
            if (params.pluginId) {
                this.state.pluginId = params.pluginId;
                this.setState({pluginId: params.pluginId})
                this.setState({activePlugin: this.state.plugins[this.state.pluginsDict[params.pluginId]]});
            }

            let regexResult = this.props.location.pathname.match(/\/configurations\/(.+?)\/edit/);
            if (regexResult) {
                let configurationId = regexResult[1];
                this.setConfigurationFormToEdit(configurationId);
            }
        })
    }

    setPlugins = async () => {
        let response = await Axios.get("/plugins/get");
        this.setState({plugins: response.data})
        let pluginsDict = {};
        response.data.forEach((plugin, i) => {
            pluginsDict[plugin._id] = i;
        })
        this.setState({pluginsDict: pluginsDict});
    }

    setConfigurationFormToEdit = async (configurationId) => {
        this.setState({editConfigurationId: configurationId});
        let response = await Axios.get(`/configurations/get?id=${configurationId}`)
        let configuration = response.data[0]
        let newState = {
            editConfigurationId: configurationId,
            formAction: `/configurations/${configurationId}?_method=PUT`,
            name: configuration.name,
            pluginId: configuration.pluginId,
            parameters: configuration.parameters,
            schedule: configuration.schedule,
            activePlugin: this.state.plugins[this.state.pluginsDict[configuration.pluginId]]
        }
        this.setState(newState);
    }

    render() {
        return (
            <Box>
                <Container>
                    <Title title="Create New Configuration" />
                    <Spacer />
                    <form 
                        action={this.state.formAction}
                        method={this.state.formMethod}
                    >
                        <SectionTitle sectionTitle="Plugin" />
                        <InputLabel
                            htmlFor="select-plugin"
                            id="select-plugin-label"
                        >
                            Select plugin this configuration is based off of
                        </InputLabel>
                        <Select
                            id="select-plugin"
                            name="configuration[pluginId]"
                            value={this.state.pluginId}
                            onChange={e => {
                                let newState = {
                                    pluginId: e.target.value,
                                    activePlugin: this.state.plugins[this.state.pluginsDict[e.target.value]]
                                }
                                this.setState(newState);
                            }}
                        >
                            {this.state.plugins.map(plugin => {
                                return (
                                    <MenuItem
                                        key={plugin._id}
                                        value={plugin._id}
                                    >
                                        {plugin.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>

                        {this.state.pluginId !== "" && this.state.activePlugin !== undefined
                        ?
                            <div>
                                <Spacer />
                                <SectionTitle sectionTitle="Name" />
                                <FormGroup>
                                    <FormControl>
                                        <InputLabel
                                            htmlFor="name"
                                        >
                                            Configuration name
                                        </InputLabel>
                                        <Input 
                                            id="name"
                                            name="configuration[name]"
                                            value={this.state.name}
                                            onChange={e => this.setState({name: e.target.value})}
                                        />
                                        <FormHelperText>
                                            short, descriptive name of new
                                            configuration
                                        </FormHelperText>
                                    </FormControl>
                                </FormGroup>
                                <Spacer />
                                <SectionTitle sectionTitle="Parameters" />
                                <FormGroup>
                                    {this.state.activePlugin.inputs.map(input => {
                                        return (
                                            <FormControl>
                                                <InputLabel
                                                    htmlFor={`parameters-${input.key}`}
                                                >
                                                    {input.key}
                                                </InputLabel>
                                                <Input
                                                    name={`configuration[parameters][${input.key}]`}
                                                    type={input.type}
                                                    id={`parameters-${input.key}`}
                                                    value={this.state.parameters[input.key]}
                                                    onChange={e => {
                                                        let parameters = {...this.state.parameters};
                                                        parameters[input.key] = e.target.value;
                                                        this.setState({parameters: parameters});
                                                    }}
                                                />
                                                <FormHelperText
                                                    id={`parameters-${input.key}-helper`}
                                                >
                                                    {input.description}
                                                </FormHelperText>
                                            </FormControl>
                                        )
                                    })}
                                    
                                </FormGroup>

                                <Spacer />
                                <SectionTitle sectionTitle="Schedule" />
                                <FormGroup>
                                    <FormControl>
                                        <InputLabel
                                            htmlFor="parameters-cronstring"
                                        >
                                            Cron String
                                        </InputLabel>
                                        <Input 
                                            name="configuration[schedule][cronString]"
                                            id="parameters-cronstring"
                                            value={this.state.schedule.cronString}
                                            onChange={e => {
                                                let newState = {
                                                    schedule : {
                                                        cronString: e.target.value
                                                    }
                                                }
                                                this.setState(newState);
                                            }}
                                        />
                                        <FormHelperText
                                            id="parameters-cronstring-helper"
                                        >
                                            Unix cron utility string
                                        </FormHelperText>
                                    </FormControl>
                                </FormGroup>
                                <Spacer />
                                <Input type="submit">Submit Form</Input>
                                <Spacer />
                            </div>
                        : null}
                    </form>
                </Container>
            </Box>
        )
    }
}

export default ConfigurationForm;
