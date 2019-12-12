import Configuration from '../../models/configuration';

const update = (req, res) => {
    Configuration.findByIdAndUpdate(req.params.id, req.body.configuration, (error, updated) => {
        if (error) {
            req.flash('error', 'Error: Could not update configuration');
            res.redirect("/configurations");
        } else {
            req.flash('success', 'Configuration updated');
            res.redirect("/configurations");
        }
    })
}

export default update;
