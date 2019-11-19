import express from "express";
import process from "process";
import bodyParser from "body-parser";
import mongoose from 'mongoose';

import pluginsRouter from './routes/plugins/router';

const ejs = require("ejs").__express;
const server = express();
const port = process.env.PORT || 3000;
server.use(bodyParser.urlencoded({extended:true}));
server.set("view engine", "ejs");
server.engine(".ejs", ejs);
server.use(express.static("public"));

mongoose.connect(
    "mongodb://localhost:27017/ga4gh_testbed",
    {useNewUrlParser: true}
);

const renderReact = (req, res) => res.render("reactApp");
server.get("/", renderReact);
server.get("/plugins", renderReact);
server.get("/configurations", renderReact);
server.get("/foo", renderReact);
server.get("/bar", renderReact);

server.use("/plugins", pluginsRouter);

// server.get("/", (req, res) => {
//  res.send("This is a new Application for the GA4GH!");
// })

server.listen(port, () => {
    console.log(`GA4GH Interoperability Testbed running on port ${port}`);
})