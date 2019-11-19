import React from 'react';
import { makeStyles } from '@material-ui/styles';
import styles from '../../assets/jss/components/common/FooStyles';
const useStyles = makeStyles(styles);

const Foo = props => {
    const classes = useStyles();
    return (
        <div className={classes.regularH1}>
            <h1>This is a Foo</h1>
        </div>
    )
}

export default Foo;