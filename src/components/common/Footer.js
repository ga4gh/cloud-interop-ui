import React from 'react';
import {
    Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import styles from '../../assets/jss/components/common/FooterStyles';
const useStyles = makeStyles(styles);

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.default}>
            <Typography variant="h6">
                GA4GH Test Orchestrator
            </Typography>
            
        </div>
    )

}

export default Footer;