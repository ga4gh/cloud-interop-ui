import React, { Component } from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

import Axios from 'axios';

import FlashMessageGroup from './components/common/FlashMessageGroup';
import Navbar from './components/common/Navbar';
import Plugins from './components/pages/Plugins';
import PluginForm from './components/forms/PluginForm';
import Configurations from './components/pages/Configurations';

class App extends Component {

    state = {
        sidebarVisible: false,
        plugins: [],
        schedules: [],
        pluginsMap: {}
    }

    constructor() {
        super();
        this.setCompleteState();
    }

    toggleSidebar = () => {
        this.setState({sidebarVisible: !this.state.sidebarVisible})
    }

    async getPlugins() {
        let pluginLinksResp = await Axios.get("/resources/plugins/plugins.txt");
        let allPaths = pluginLinksResp.data.split(/\r?\n/);
        let promises = allPaths.map(path => {
            return new Promise(async (resolve, reject) => {
                let pluginJsonResp = await Axios.get(path);
                let plugin = pluginJsonResp.data;
                resolve(plugin);
            })
        })
        return await Promise.all(promises);
    }

    setPlugins() {
        return new Promise(async (resolve, reject) => {
            let plugins = await this.getPlugins();
            this.setState({plugins: plugins})
            resolve("done");
        })
    }

    async getSchedules() {
        let scheduleLinksResp = await Axios.get("/resources/schedules/schedules.txt");
        let allPaths = scheduleLinksResp.data.split(/\r?\n/);
        let promises = allPaths.map(path => {
            return new Promise(async (resolve, reject) => {
                let scheduleJsonResp = await Axios.get(path);
                let schedule = scheduleJsonResp.data;
                resolve(schedule);
            })
        })
        return await Promise.all(promises);
    }

    setSchedules() {
        return new Promise(async (resolve, reject) => {
            let schedules = await this.getSchedules();
            this.setState({schedules: schedules})
            resolve("done");
        })
    }

    assignSingleScheduleToPluginMap = schedule => {
        return new Promise((resolve, reject) => {
            Axios
                .get(schedule.plugin_url)
                .then(pluginResp => {
                    let plugin = pluginResp.data;
                    this.state.pluginsMap[schedule.name] = plugin;
                    console.log("done initializing one obj");
                })
                .finally(() => {
                    resolve("done!");
                })
        })
    }
    anAsyncFunction = async schedule => {
        return await this.assignSingleScheduleToPluginMap(schedule);
    }
    setPluginsMap = () => {
        return new Promise(async (resolve, reject) => {
            console.log("initializing pluginsMap");
            await Promise.all(this.state.schedules.map(schedule => this.anAsyncFunction(schedule)));
            console.log("done initializing pluginsMap");
            resolve("done");
        })
    }

    setCompleteState = async () => {
        await Promise.all([this.setPlugins(), this.setSchedules()]);
        await Promise.all([this.setPluginsMap()]);
    }

    render() {
        return (
            <div className="App">
                <Navbar 
                  changePageFunction={this.changePage}
                  sidebarFunction={this.toggleSidebar}
                  sidebarVisible={this.state.sidebarVisible}
                />
                <FlashMessageGroup
                    flashSuccess={JSON.parse(window.flashSuccess)}
                    flashError={JSON.parse(window.flashError)}
                 />
                <Router>
                    <Route exact path="/plugins" component={Plugins} />
                    <Route exact path="/plugins/new" component={PluginForm} />
                    <Route exact path="/configurations" component={Configurations} />
                </Router>
            </div>
        )
    }
}

export default App
