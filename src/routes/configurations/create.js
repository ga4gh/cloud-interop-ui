import Configuration from '../../models/configuration';

const create = (req, res) => {
    var newConfiguration = req.body.configuration;
    Configuration.create(newConfiguration, (error, created) => {
        if (error) {
            req.flash('error', 'Error: Could not create configuration');
            res.redirect("/configurations");
        } else {
            req.flash('success', 'New Configuration created');
            res.redirect("/configurations");
        }  
    })
}

export default create;
