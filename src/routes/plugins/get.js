import Plugin from '../../models/plugin';
import Mongoose from 'mongoose';

const get = (req, res) => {
    let searchParams = {};
    if (req.query.id) {
        searchParams._id = Mongoose.Types.ObjectId(req.query.id);
    }

    Plugin.find(searchParams, (error, foundArticles) => {
        if (error) {
            req.flash('error', 'Error: Could not get plugins');
            res.send({});
        } else {
            res.send(JSON.stringify(foundArticles));
        }
    })
}

export default get;
