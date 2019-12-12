import Configuration from '../../models/configuration';
import Mongoose from 'mongoose';

const get = (req, res) => {
    let searchParams = {};
    if (req.query.id) {
        searchParams._id = Mongoose.Types.ObjectId(req.query.id);
    }

    Configuration.find(searchParams, (error, foundConfigurations) => {
        if (error) {
            req.flash('error', 'Error: Could not get configurations');
            res.send({});
        } else {
            res.send(JSON.stringify(foundConfigurations));
        }
    })
}

export default get;
