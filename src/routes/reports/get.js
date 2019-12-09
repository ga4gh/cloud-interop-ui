import Report from '../../models/report';

const get = (req, res) => {
    Report.findById(req.params.id, (error, found) => {
        if (error) {
            res.send(JSON.stringify({
                error: "Could not find Report"
            }))
        } else {
            res.send(JSON.stringify(found));
        }
    })
}

export default get;
