import React from 'react';
import {
    Block as BlockIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Warning as WarningIcon
} from '@material-ui/icons';

const passedIcon = <CheckCircleIcon style={{color: "#270"}}/>
const warnedIcon = <WarningIcon style={{color: "#9F6000"}}/>
const skippedIcon = <BlockIcon style={{color: "#059"}} />
const failedIcon = <CancelIcon style={{color: "#D8000C"}} />
const icons = {
    passed: passedIcon,
    warned: warnedIcon,
    skipped: skippedIcon,
    failed: failedIcon
}

const statuses = {
    1: "passed",
    2: "warned",
    3: "skipped",
    4: "failed"
}

export {
    passedIcon,
    warnedIcon,
    skippedIcon,
    failedIcon,
    icons,
    statuses
}

/*  background colors
    passed: #DFF2BF
    warned: #FEEFB3
    skipped: #BEF
    error: #FFBABA
*/