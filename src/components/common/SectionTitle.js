import React from 'react';
import {
    Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import styles from '../../assets/jss/components/common/SectionTitleStyles';
const useStyles = makeStyles(styles);

const SectionTitle = props => {
    const classes = useStyles();
    return (
        <div className={classes.sectionTitle}>
            <Typography variant="h4">{props.sectionTitle}</Typography>
        </div>
    )
}

export default SectionTitle;
