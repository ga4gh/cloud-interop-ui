import express from 'express';
import {renderReact} from '../../functions/routes';
import create from './create';
import get from './get';
import put from './put';
import destroy from './destroy';

var router = express.Router();
router.get("/", renderReact);
router.get("/new", renderReact);
router.get("/get", get);
router.post("/", create);
router.put("/", put);
router.delete("/:id", destroy);

export default router;
