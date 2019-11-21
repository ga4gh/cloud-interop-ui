import Plugin from '../../models/plugin';

const destroy = (req, res) => {
    Plugin.findByIdAndRemove(req.params.id, err => {
        if (err) {
            req.flash('error', 'Error: Could not delete plugin');
            res.send(200);
        } else {
            req.flash('success', 'Deleted plugin');
            res.send(200);
        }
    })
}

export default destroy;
