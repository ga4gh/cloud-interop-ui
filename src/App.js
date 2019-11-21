import React, { Component } from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

import Axios from 'axios';

import FlashMessageGroup from './components/common/FlashMessageGroup';
import Navbar from './components/common/Navbar';
import Plugins from './components/pages/Plugins';
import PluginForm from './components/forms/PluginForm';
import Configurations from './components/pages/Configurations';
import ConfigurationForm from './components/forms/ConfigurationForm';

class App extends Component {

    state = {
        sidebarVisible: false,
        plugins: [],
        schedules: [],
        pluginsMap: {}
    }

    toggleSidebar = () => {
        this.setState({sidebarVisible: !this.state.sidebarVisible})
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
                    <Route exact path="/configurations/new" component={ConfigurationForm} />
                </Router>
            </div>
        )
    }
}

export default App;
