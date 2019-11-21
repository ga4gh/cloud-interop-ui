import React from 'react';
import {
    Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import styles from '../../assets/jss/components/common/TitleStyles';
const useStyles = makeStyles(styles);

const Title = props => {
    const classes = useStyles();
    return (
        <div className={classes.title}>
            <Typography variant="h2">{props.title}</Typography>
        </div>
    )
}

export default Title;
