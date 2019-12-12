import Plugin from '../../models/plugin';

const create = (req, res) => {
    var newPlugin = req.body.plugin;
    console.log(newPlugin);
    console.log("***");
    Plugin.create(newPlugin, (error, created) => {
        if (error) {
            req.flash('error', 'Error: Could not create plugin');
            res.redirect("/plugins");
        } else {
            req.flash('success', 'New plugin created');
            res.redirect("/plugins");
        }
    })
}

export default create;
