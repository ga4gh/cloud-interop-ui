import strftime from 'strftime';
import {
    icons,
    statuses
} from '../constants/icons';

const formatTimestamp = timestamp => {
    let date = new Date(timestamp);
    return strftime("%b %d, %Y at %H:%M:%S %z", date);
}

const formatReportSummary = reportSummary => {
    let strings = [];
    let keys = ["passed", "warned", "skipped", "failed"]
    keys.forEach(key => {
        if (reportSummary[key] > 0) {
            strings.push(`${reportSummary[key]} ${key}`);
        }
    })
    let string = strings.join(" / ");
    return string;
}

const iconFromStatus = status => {
    return icons[statuses[status]];
}

const iconFromSummary = reportSummary => {

    let icon = null;
    let keys = ["passed", "warned", "skipped", "failed"]
    keys.forEach(key => {
        if (reportSummary[key] > 0) {
            icon = icons[key];
        }
    })
    return icon;
}

export {
    formatTimestamp,
    formatReportSummary,
    iconFromStatus,
    iconFromSummary
}