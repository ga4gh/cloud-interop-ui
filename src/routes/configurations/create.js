import Configuration from '../../models/configuration';

const create = (req, res) => {
    console.log(req.body.configuration);
    // Configuration.create(req.body.configuration, (error, created) => {
        
    // })
    res.redirect("/configurations");
}

export default create;
