import express from 'express';
import {renderReact} from '../../functions/routes';
import create from './create';
import get from './get';

var router = express.Router();
router.get("/", renderReact);
router.get("/new", renderReact);
router.get("/get", get);
router.post("/", create);

export default router;
