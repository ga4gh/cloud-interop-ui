import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import SidebarListItem from './SidebarListItem';
import styles from '../../assets/jss/components/common/SidebarStyles';
const useStyles = makeStyles(styles);

import {
    Code as CodeIcon,
    Mail as MailIcon,
    Inbox as InboxIcon,
    Home as HomeIcon
} from '@material-ui/icons';

const Sidebar = (props) => {
    const classes = useStyles();
    const listItems = {
        "home": {
            key: "home",
            label: "Home",
            icon: <HomeIcon />,
            href: "/"
        },

        "plugins": {
            key: "plugins",
            label: "Plugins",
            icon: <CodeIcon />,
            href: "/plugins"
        },

        "configurations": {
            key: "configurations",
            label: "Configurations",
            icon: <CodeIcon />,
            href: "/configurations"
        },

        "foo": {
            key: "foo",
            label: "Foo", 
            icon: <MailIcon />,
            href: "/foo"
        },

        "bar": {
            key: "bar",
            label: "Bar",
            icon: <CodeIcon />,
            href: "/bar"
        }
    }
    const itemKeys = ["home", "plugins", "configurations", "foo", "bar"];

    return (
        <div>      
            <Drawer 
                anchor="right"
                open={props.visible}
                onClick={props.sidebarFunction}>
                <div
                    className={classes.sidebar}
                    role="presentation"
                >
                    <List>
                        {itemKeys.map(k => {
                            return (
                                <SidebarListItem 
                                    key={listItems[k].key}
                                    href={listItems[k].href}
                                    icon={listItems[k].icon}
                                    label={listItems[k].label}
                                />
                            )
                        })}
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

export default Sidebar;
