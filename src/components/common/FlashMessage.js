import React from 'react';
import classNames from 'classnames';
import {
    IconButton,
    Snackbar,
    Typography
} from '@material-ui/core';

import {
    Close as CloseIcon,
    CheckCircle as CheckCircleIcon,
    Error as ErrorIcon
} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import styles from '../../assets/jss/components/common/FlashMessageStyles';
const useStyles = makeStyles(styles);

const FlashMessage = props => {

    const [open, setOpen] = React.useState("open");
    const classes = useStyles();
    const variantIcons = {
        success: <CheckCircleIcon />,
        error: <ErrorIcon />
    }

    return (
        <div className={classNames(classes.default, classes[props.variant], classes[open])}>
            <Typography display="inline" variant="body1">
                <span>
                    {variantIcons[props.variant]}
                    {props.message}
                    <IconButton
                        onClick={() => setOpen("closed")}
                    >
                        <CloseIcon />
                    </IconButton>

                </span>
            </Typography>
        </div>
    )

}

export default FlashMessage;
