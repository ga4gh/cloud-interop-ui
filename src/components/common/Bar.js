import React from 'react';
import { makeStyles } from '@material-ui/styles';
import styles from '../../assets/jss/components/common/BarStyles';
const useStyles = makeStyles(styles);

const Bar = props => {
    const classes = useStyles();
    return (
        <div className={classes.regularH1}>
            <h1>This is a Bar</h1>
        </div>
    )
}

export default Bar;