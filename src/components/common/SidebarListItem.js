import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const SidebarListItem = props => {
    
    return (
        <ListItem button component="a" href={props.href}>
            <ListItemIcon>{props.icon}</ListItemIcon>
            <ListItemText primary={props.label} />
        </ListItem>
    )
}

export default SidebarListItem;