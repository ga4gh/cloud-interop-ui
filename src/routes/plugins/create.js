import Plugin from '../../models/plugin';

const create = (req, res) => {
    var newPlugin = req.body.plugin;
    Plugin.create(newPlugin, (error, created) => {
        if (error) {
            console.log(error);
            res.redirect("/plugins");
        } else {
            console.log(created);
            res.redirect("/plugins");
        }
    })
}

export default create;
