import React, {Component} from 'react';
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
    Typography,
    Table,
    TextField
} from '@material-ui/core';
import Spacer from '../common/Spacer';

class PluginForm extends Component {

    state = {
        name: "",
        description: "",
        inputs: [],
        codebase: {
            package: "",
            module: "",
            method: ""
        }
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

    render() {
        return (
            <Box>
                <Container>
                    <Typography variant="h1">
                        Create New Plugin
                    </Typography>
                    <Spacer />
                    <form action="/plugins" method="post">
                        <Typography variant="h3">
                            Name
                        </Typography>
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
                        <Typography variant="h3">
                            Description
                        </Typography>
                        <FormControl>
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
                            <FormHelperText id="description-helper">Longer description, outline test cases and report output</FormHelperText>
                        </FormControl>
                        <Spacer />
                        <Typography variant="h3">
                            Inputs
                        </Typography>
                        <Button 
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
                                                htmlFor="inputs-{i}-key"
                                            >
                                                Input {i}: Key
                                            </InputLabel>
                                            <Input 
                                                name={"plugin[inputs]["+i+"][key]"}
                                                id="inputs-{i}-key"
                                                aria-describedby="inputs-{i}-key-helper" 
                                                value={this.state.inputs[i].key}
                                                onChange={this.inputChangeHandler.bind(this, i, "key")}
                                            />
                                            <FormHelperText
                                                id="inputs-{i}-key-helper"
                                            >
                                                The key
                                            </FormHelperText>
                                        </FormControl>
                                        <FormControl>
                                            <InputLabel 
                                                htmlFor="inputs-{i}-type"
                                            >
                                                Input {i}: Type
                                            </InputLabel>
                                            <Input 
                                                name={"plugin[inputs]["+i+"][type]"}
                                                id="inputs-{i}-type"
                                                aria-describedby="inputs-{i}-type-helper"
                                                value={this.state.inputs[i].type}
                                                onChange={this.inputChangeHandler.bind(this, i, "type")}
                                            />
                                            <FormHelperText
                                                id="inputs-{i}-type-helper"
                                            >
                                                The type
                                            </FormHelperText>
                                        </FormControl>
                                        <FormControl>
                                            <InputLabel
                                                htmlFor="inputs-{i}-description"
                                            >
                                                Input {i}: Description
                                            </InputLabel>
                                            <Input
                                                name={"plugin[inputs]["+i+"][description]"}
                                                id="inputs-{i}-description"
                                                aria-describedby="inputs-{i}-description-helper"
                                                value={this.state.inputs[i].description}
                                                onChange={this.inputChangeHandler.bind(this, i, "description")}
                                            />
                                            <FormHelperText
                                                id="inputs-{i}-description-helper"
                                            >
                                                The description
                                            </FormHelperText>
                                        </FormControl>
                                        <FormControl>
                                            <Button 
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
                        <Typography variant="h3">
                            Codebase
                        </Typography>
                        <FormControl>
                            <InputLabel 
                                htmlFor="codebase-package"
                            >
                                Package
                            </InputLabel>
                            <Input 
                                name="plugin[codebase][package]"
                                id="codebase-package"
                                aria-describedby="codebase-package-helper"
                                value={this.state.codebase.package}
                                onChange={this.codebaseChangeHandler.bind(this, "package")}
                            />
                            <FormHelperText 
                                id="codebase-package-helper"
                            >
                                Dot-notation path of python package (excluding module)
                            </FormHelperText>
                        </FormControl>

                        <FormControl>
                            <InputLabel 
                                htmlFor="codebase-module"
                            >
                                Module
                            </InputLabel>
                            <Input 
                                name="plugin[codebase][module]"
                                id="codebase-module"
                                aria-describedby="codebase-module-helper"
                                value={this.state.codebase.module}
                                onChange={this.codebaseChangeHandler.bind(this, "module")}
                            />
                            <FormHelperText 
                                id="codebase-module-helper"
                            >
                                Module name containing test method
                            </FormHelperText>
                        </FormControl>

                        <FormControl>
                            <InputLabel 
                                htmlFor="codebase-method"
                            >
                                Method
                            </InputLabel>
                            <Input 
                                name="plugin[codebase][method]"
                                id="codebase-method"
                                aria-describedby="codebase-method-helper"
                                value={this.state.codebase.method}
                                onChange={this.codebaseChangeHandler.bind(this, "method")}
                            />
                            <FormHelperText 
                                id="codebase-method-helper"
                            >
                                Method name/signature in specified module
                            </FormHelperText>
                        </FormControl>
                        <Spacer />
                        <Input
                            type="submit"
                        >
                            Submit Form
                        </Input>
                    </form>
                </Container>
            </Box>
        )
    }
}

export default PluginForm;
