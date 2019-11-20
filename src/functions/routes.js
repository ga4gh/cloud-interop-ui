const renderReact = (req, res) => {
    const vars = {
        flashSuccess: JSON.stringify(req.flash("success")),
        flashError: JSON.stringify(req.flash("error"))
    }
    res.render("reactApp", vars);
}

export {
    renderReact
};