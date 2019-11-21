import Plugin from '../../models/plugin';

const get = (req, res) => {
    Plugin.find({}, (error, foundArticles) => {

        if (error) {
            req.flash('error', 'Error: Could not get plugins');
            res.send({});
        } else {
            res.send(JSON.stringify(foundArticles));
        }
    })
}

export default get;
