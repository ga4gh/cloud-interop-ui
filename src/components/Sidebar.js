import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import CodeIcon from '@material-ui/icons/Code';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const Sidebar = (props) => {
    const classes = useStyles();
    const listItems1 = [
        {"text": "Plugins", "icon": <CodeIcon />, "page": "plugins"},
        {"text": "Schedules", "icon": <CodeIcon />, "page": "schedules"},
    ]
    const listItems2 = [
        {"text": "Home", "icon": <CodeIcon />, "page": "home"},
        {"text": "About", "icon": <CodeIcon />, "page": "about"},
        {"text": "Contact", "icon": <CodeIcon />, "page": "contact"}
    ]
    const listToJSX = (list) => {
        return (
            <List>
                {list.map((item, index) => {
                    return (
                        <ListItem button key={item.text} 
                            onClick={() => props.changePageFunction(item.page)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    )
                })}
            </List>
        )
    }

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
        >
            {listToJSX(listItems1)}
            <Divider />
            {listToJSX(listItems2)}
        </div>
    );

    return (

        <div>      
            <Drawer anchor="right" open={props.visible} onClick={props.sidebarFunction} >
                {sideList('right')}
            </Drawer>
        </div>
    );
}

export default Sidebar;
