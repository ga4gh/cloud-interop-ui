import express from 'express';
import {renderReact} from '../../functions/routes';
import create from './create';
import put from './put';

var router = express.Router();
router.get("/", renderReact);
router.get("/new", renderReact);
router.post("/", create);
router.put("/", put);

export default router;