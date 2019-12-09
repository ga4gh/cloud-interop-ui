import Configuration from '../../models/configuration';

const get = (req, res) => {
    Configuration.find({}, (error, foundConfigurations) => {
        if (error) {
            req.flash('error', 'Error: Could not get configurations');
            res.send({});
        } else {
            res.send(JSON.stringify(foundConfigurations));
        }
    })
}

export default get;
