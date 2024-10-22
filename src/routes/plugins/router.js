import express from 'express';
import {renderReact} from '../../functions/routes';
import create from './create';
import get from './get';
import update from './update';
import destroy from './destroy';

var router = express.Router();
router.get("/", renderReact);
router.get("/get", get);
router.get("/new", renderReact);
router.post("/", create);
router.get("/:id/edit", renderReact);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
