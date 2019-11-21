import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import process from "process";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import methodOverride from 'method-override';

import {renderReact} from './functions/routes';
import pluginsRouter from './routes/plugins/router';
import configurationsRouter from './routes/configurations/router';

const ejs = require("ejs").__express;
const server = express();
const port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({extended:true}));
server.set("view engine", "ejs");
server.engine(".ejs", ejs);
server.use(express.static("public"));
server.use(cookieParser('secretHere'));
server.use(session());
server.use(flash());
server.use(methodOverride('_method'));

mongoose.connect(
    "mongodb://localhost:27017/ga4gh_testbed",
    {useNewUrlParser: true}
);
mongoose.set('useFindAndModify', false);


server.get("/", renderReact);
server.use("/plugins", pluginsRouter);
server.use("/configurations", configurationsRouter);

server.listen(port, () => {
    console.log(`GA4GH Interoperability Testbed running on port ${port}`);
})
