import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import FlashMessageGroup from './components/common/FlashMessageGroup';

import Navbar from './components/common/Navbar';
import Home from './components/pages/Home';
import Plugins from './components/pages/Plugins';
import PluginForm from './components/forms/PluginForm';
import Configurations from './components/pages/Configurations';
import ConfigurationForm from './components/forms/ConfigurationForm';
import Reports from './components/pages/Reports';
import ReportsShow from './components/pages/ReportsShow';
import Footer from './components/common/Footer';

import { withStyles } from '@material-ui/styles';
const styles = theme => ({
    pageContainer: {
        minHeight: "100vh",
        position: "relative"
    },
    contentWrap: {
        paddingBottom: "2.5rem"
    }
})

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
        const { classes } = this.props;
        return (
            <div className={classes.pageContainer}>
                <div className={classes.contentWrap}>
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
                        <Route exact path="/" component={Home} />
                        <Route exact path="/plugins" component={Plugins} />
                        <Route exact path="/plugins/new" component={PluginForm} />
                        <Route exact path="/plugins/:id/edit" component={PluginForm} />
                        <Route exact path="/configurations" component={Configurations} />
                        <Route exact path="/configurations/new" component={ConfigurationForm} />
                        <Route exact path="/configurations/:id/edit" component={ConfigurationForm} />
                        <Route exact path="/reports" component={Reports} />
                        <Route exact path="/reports/:id" component={ReportsShow} />
                    </Router>
                </div>
                <Footer />
            </div>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
