import Plugin from '../../models/plugin';

const update = (req, res) => {
    Plugin.findByIdAndUpdate(req.params.id, req.body.plugin, (error, updated) => {
        if (error) {
            req.flash('error', 'Error: Could not update plugin');
            res.redirect('/plugins');
        } else {
            req.flash('success', 'Plugin updated');
            res.redirect('/plugins');
        }
    })
}

export default update;
