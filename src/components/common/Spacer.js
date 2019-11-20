import React from 'react';
import Divider from '@material-ui/core/Divider';

import {makeStyles} from '@material-ui/core/styles';
import styles from '../../assets/jss/components/common/SpacerStyles';
const useStyles = makeStyles(styles);

const Spacer = () => {
    const classes = useStyles()
    return (
        <div className={classes.spacer}>
            <Divider />
        </div>
    )
}

export default Spacer;
