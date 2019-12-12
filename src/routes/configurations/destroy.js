import Configuration from '../../models/configuration';

const destroy = (req, res) => {
    Configuration.findByIdAndRemove(req.params.id, err => {
        if (err) {
            req.flash('error', 'Error: Could not delete configuration');
            res.send(200);
        } else {
            req.flash('success', 'Deleted configuration');
            res.send(200);
        }
    })
}

export default destroy;
