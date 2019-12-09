import Report from '../../models/report';
import mongoose from 'mongoose';

const search = (req, res) => {
    let searchParams = {};

    Report.find(searchParams, (error, foundReports) => {
        if (error) {
            res.send(JSON.stringify({
                error: "Could not get reports"
            }))
        } else {
            res.send(JSON.stringify(foundReports));
        }
    })
}

export default search;
