import React from 'react';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Plugins from './Plugins';
import Schedules from './Schedules';

const PageSetter = (props) => {

    const pagesDict = {
        "home": (<Home />),
        "about": (<About />),
        "contact": (<Contact />),
        "plugins": (
            <Plugins 
                plugins={props.plugins}
            />
        ),
        "schedules": (
            <Schedules 
                schedules={props.schedules}
                pluginsMap={props.pluginsMap}
            />
        )
    }
    const page = pagesDict[props.pageKey];
    const styles = {
        paddingTop: "50px"
    }

    return (
        <div
            style={styles}
        >
            {page}
        </div>
    )
}

export default PageSetter;