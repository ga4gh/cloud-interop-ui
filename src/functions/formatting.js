import strftime from 'strftime';

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

export {
    formatTimestamp,
    formatReportSummary
}