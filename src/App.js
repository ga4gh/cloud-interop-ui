import React, { Component } from 'react';
import Navbar from './components/Navbar';
import PageSetter from './components/pages/PageSetter';
import Axios from 'axios';

class App extends Component {

    state = {
        sidebarVisible: false,
        page: "home",
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

    changePage = (newPage) => {
        this.setState({page: newPage})
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
        //console.log("setting complete state");
        //console.log("setting plugins and schedules");
        //console.log(this.state.plugins);
        await Promise.all([this.setPlugins(), this.setSchedules()]);
        //console.log("after setPlugins and setSchedules");
        //console.log(this.state.plugins);
        //console.log(this.state.plugins[0].name);
        //console.log(this.state.schedules[0].name);
        //console.log("***");
        //console.log(this.state.pluginsMap);
        await Promise.all([this.setPluginsMap()]);


        
        
        

    }

    render() {
        /*
        return (
            <p>test</p>
        )
        */
        
        return (
            <div className="App">
                <Navbar 
                  changePageFunction={this.changePage}
                  sidebarFunction={this.toggleSidebar}
                  sidebarVisible={this.state.sidebarVisible}
                />
                <PageSetter 
                  pageKey={this.state.page}
                  plugins={this.state.plugins}
                  schedules={this.state.schedules}
                  pluginsMap={this.state.pluginsMap}
                />
            </div>
        )
        
    }
}

export default App
