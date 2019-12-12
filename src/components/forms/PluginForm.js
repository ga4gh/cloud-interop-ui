import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    FormGroup,
    FormHelperText,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TextField
} from '@material-ui/core';
import SectionTitle from '../common/SectionTitle';
import Spacer from '../common/Spacer';
import Title from '../common/Title';
import Axios from 'axios';
import {withStyles} from '@material-ui/styles';
import styles from '../../assets/jss/components/forms/PluginFormStyles';

class PluginForm extends Component {

    state = {
        editPluginId: null,
        title: "Create New Plugin",
        formAction: "/plugins",
        formMethod: "POST",
        name: "",
        description: "",
        inputs: [],
        codebase: {
            source: "",
            githubSource: {},
            pypiSource: {},
            language: "",
            pythonLanguage: {}
        },
        codebaseSources: [
            "github",
            "pypi"
        ],
        codebaseSourceTree: {
            github: [
                {
                    name: "plugin[codebase][githubSource][organization]",
                    label: "Organization",
                    key: "organization"
                },
                {
                    name: "plugin[codebase][githubSource][repository]",
                    label: "Repository",
                    key: "repository"
                },
                {
                    name: "plugin[codebase][githubSource][branch]",
                    label: "Branch",
                    key: "branch"
                }
            ],
            pypi: [
                {
                    name: "plugin[codebase][pypiSource][name]",
                    label: "Name",
                    key: "name"
                },
                {
                    name: "plugin[codebase][pypiSource][version]",
                    label: "Version",
                    key: "version"
                }
            ]
        },
        codebaseLanguages: [
            "python"
        ],
        codebaseLanguageTree: {
            python: [
                {
                    name: "plugin[codebase][pythonLanguage][version]",
                    label: "Version",
                    type: "select",
                    options: [
                        "3.6",
                        "3.7"
                    ],
                    key: "version"
                },
                {
                    name: "plugin[codebase][pythonLanguage][package]",
                    label: "Package",
                    type: "text",
                    key: "package"
                },
                {
                    name: "plugin[codebase][pythonLanguage][module]",
                    label: "Module",
                    type: "text",
                    key: "module"
                },
                {
                    name: "plugin[codebase][pythonLanguage][method]",
                    label: "Method",
                    type: "text",
                    key: "method"
                }
            ]
        }
    }

    constructor(props) {
        super(props);
        let regexResult = this.props.location.pathname.match(/\/plugins\/(.+?)\/edit/);
        if (regexResult) {
            let pluginId = regexResult[1];
            this.setPluginFormToEdit(pluginId);
        };
    }

    setPluginFormToEdit = async (pluginId) => {
        this.setState({editPluginId: pluginId});
        let response = await Axios.get(`/plugins/get?id=${pluginId}`);    
        let plugin = response.data[0];

        let newState = {
            editPluginId: pluginId,
            title: `Edit Plugin: ${pluginId}`,
            formAction: `/plugins/${pluginId}?_method=PUT`,
            name: plugin.name,
            description: plugin.description,
            inputs: plugin.inputs,
            // codebase: plugin.codebase
            codebase: Object.assign(this.state.codebase, plugin.codebase)
        }
        this.setState(newState);
    }

    removeInputHandler = i => {
        let newInputs = [...this.state.inputs];
        newInputs.splice(i, 1);
        this.setState({inputs: newInputs});
    }

    inputChangeHandler = (i, attribute, e) => {
        let newInputs = [...this.state.inputs];
        newInputs[i][attribute] = e.target.value;
        this.setState({inputs: newInputs});
    }

    codebaseChangeHandler = (attribute, e) => {
        let newCodebase = {...this.state.codebase};
        newCodebase[attribute] = e.target.value;
        this.setState({codebase: newCodebase});
    }

    codebaseSourceChangeHandler = (sourceName, attribute, e) => {
        let newCodebase = {...this.state.codebase};
        newCodebase[sourceName][attribute] = e.target.value;
        this.setState({codebase: newCodebase});
    }

    render() {
        const { classes } = this.props;
        return (
            <Box>
                <Container>
                    <Title title={this.state.title} />
                    <Spacer />
                    <form
                        action={this.state.formAction}
                        method={this.state.formMethod}
                    >
                        <SectionTitle sectionTitle="Name" />
                        <FormControl>
                            <InputLabel 
                                htmlFor="name"
                            >
                                Name
                            </InputLabel>
                            <Input 
                                name="plugin[name]"
                                id="name"
                                aria-describedby="name-helper"
                                value={this.state.name}
                                onChange={e => this.setState({name: e.target.value})}
                            />
                            <FormHelperText 
                                id="name-helper"
                            >
                                Short, descriptive name for plugin
                            </FormHelperText>
                        </FormControl>
                        <Spacer />

                        <SectionTitle sectionTitle="Description" />
                        <FormControl
                            fullWidth={true}
                        >
                            <TextField
                                placeholder="Description" 
                                name="plugin[description]"
                                id="description"
                                aria-describedby="description-helper" 
                                multiline={true}
                                rows={5}
                                rowsMax={5}
                                value={this.state.description}
                                onChange={e => this.setState({description: e.target.value})}
                            />
                            <FormHelperText id="description-helper">Longer description</FormHelperText>
                        </FormControl>
                        <Spacer />

                        <SectionTitle sectionTitle="Inputs" />
                        <Button 
                            className={classes.addInputButton}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                let newInputs = [...this.state.inputs];
                                let newInput = {
                                    key: "",
                                    type: "",
                                    description: ""
                                }
                                newInputs.push(newInput);
                                this.setState({inputs: newInputs});
                            }}
                        >
                            Add New Input
                        </Button>
                        <div id="inputs">
                            {this.state.inputs.map((input, i) => {
                                return (
                                    <div>
                                        <FormControl>
                                            <InputLabel 
                                                className={classes.inputsLabel}
                                                htmlFor="inputs-{i}-key"
                                            >
                                                Input {i}: Key
                                            </InputLabel>
                                            <Input 
                                                className={classes.inputsField}
                                                name={"plugin[inputs]["+i+"][key]"}
                                                id="inputs-{i}-key"
                                                aria-describedby="inputs-{i}-key-helper" 
                                                value={this.state.inputs[i].key}
                                                onChange={this.inputChangeHandler.bind(this, i, "key")}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <InputLabel 
                                                className={classes.inputsLabel}
                                                htmlFor="inputs-{i}-type"
                                            >
                                                Input {i}: Type
                                            </InputLabel>
                                            <Input 
                                                className={classes.inputsField}
                                                name={"plugin[inputs]["+i+"][type]"}
                                                id="inputs-{i}-type"
                                                aria-describedby="inputs-{i}-type-helper"
                                                value={this.state.inputs[i].type}
                                                onChange={this.inputChangeHandler.bind(this, i, "type")}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <InputLabel
                                                className={classes.inputsLabel}
                                                htmlFor="inputs-{i}-description"
                                            >
                                                Input {i}: Description
                                            </InputLabel>
                                            <Input
                                                className={classes.inputsField}
                                                name={"plugin[inputs]["+i+"][description]"}
                                                id="inputs-{i}-description"
                                                aria-describedby="inputs-{i}-description-helper"
                                                value={this.state.inputs[i].description}
                                                onChange={this.inputChangeHandler.bind(this, i, "description")}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <Button 
                                                className={classes.inputsRemoveButton}
                                                variant="contained" 
                                                color="secondary"
                                                onClick={this.removeInputHandler.bind(this, i)}
                                            >
                                                Remove
                                            </Button>
                                        </FormControl>
                                    </div>
                                )
                            })}
                        </div>
                        <Spacer />
                        <SectionTitle sectionTitle="Codebase" />
                        
                        <div>
                            <FormControl>
                                <InputLabel
                                    className={classes.inputsLabel}
                                    htmlFor="codebase-source"
                                >
                                    Source
                                </InputLabel>
                                <Select
                                    className={classes.inputsSelect}
                                    name="plugin[codebase][source]"
                                    value={this.state.codebase.source}
                                    onChange={e => {
                                        let codebase = this.state.codebase;
                                        codebase.source = e.target.value;
                                        this.setState({codebase: codebase});
                                    }}
                                >
                                    {this.state.codebaseSources.map(codebaseSource => {
                                        return (
                                            <MenuItem
                                                key={codebaseSource}
                                                value={codebaseSource}
                                            >
                                                {codebaseSource}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>

                            {this.state.codebase.source !== ""
                            ?
                                this.state.codebaseSourceTree[this.state.codebase.source].map((codebaseInput) => {
                                    return (
                                        <FormControl>
                                            <InputLabel
                                                className={classes.inputsLabel}
                                                htmlFor={`codebase-${codebaseInput.key}`}
                                            >
                                                {codebaseInput.label}
                                            </InputLabel>
                                            <Input
                                                className={classes.inputsField}
                                                name={codebaseInput.name}
                                                id={`codebase-${codebaseInput.key}`}
                                                value={this.state.codebase[`${this.state.codebase.source}Source`][codebaseInput.key]}
                                                onChange={this.codebaseSourceChangeHandler.bind(this, `${this.state.codebase.source}Source`, codebaseInput.key)}
                                            />
                                        </FormControl>
                                    )
                                })
                            : null
                            }
                        </div>

                        {/* Codebase language */}
                        <div>
                            <FormControl>
                                <InputLabel
                                    className={classes.inputsLabel}
                                    htmlFor="codebase-language"
                                >
                                    Language
                                </InputLabel>
                                <Select
                                    className={classes.inputsSelect}
                                    name="plugin[codebase][language]"
                                    id="codebase-language"
                                    value={this.state.codebase.language}
                                    onChange={e => {
                                        let codebase = this.state.codebase;
                                        codebase.language = e.target.value;
                                        this.setState({codebase: codebase});
                                    }}
                                >
                                    {this.state.codebaseLanguages.map(codebaseLanguage => {
                                        return (
                                            <MenuItem
                                                key={codebaseLanguage}
                                                value={codebaseLanguage}
                                            >
                                                {codebaseLanguage}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>

                            {this.state.codebase.language !== ""
                            ?
                                this.state.codebaseLanguageTree[this.state.codebase.language].map(langInput => {
                                    return (
                                        <FormControl>
                                            <InputLabel
                                                className={classes.inputsLabel}
                                                htmlFor={`codebase-${langInput.key}`}
                                            >
                                                {langInput.label}
                                            </InputLabel>
                                            {langInput.type === "select"
                                            ?
                                                <Select
                                                    className={classes.inputsSelect}
                                                    name={langInput.name}
                                                    id={`codebase-${langInput.key}`}
                                                    value={this.state.codebase[`${this.state.codebase.language}Language`][langInput.key]}
                                                    onChange={this.codebaseSourceChangeHandler.bind(this, `${this.state.codebase.language}Language`, langInput.key)}
                                                >
                                                    {langInput.options.map(opt => {
                                                        return (
                                                            <MenuItem
                                                                key={opt}
                                                                value={opt}
                                                            >
                                                                {opt}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            :
                                                <Input
                                                    className={classes.inputsField}
                                                    name={langInput.name}
                                                    id={`codebase-${langInput.key}`}
                                                    value={this.state.codebase[`${this.state.codebase.language}Language`][langInput.key]}
                                                    onChange={this.codebaseSourceChangeHandler.bind(this, `${this.state.codebase.language}Language`, langInput.key)}
                                                />                                            
                                            }
                                        </FormControl>
                                    )
                                })
                            : null
                            }
                        </div>
                        <Spacer />
                        <Input type="submit">Submit Form</Input>
                        <Spacer />
                    </form>
                </Container>
            </Box>
        )
    }
}

PluginForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PluginForm);
