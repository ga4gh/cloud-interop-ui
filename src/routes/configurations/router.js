import express from 'express';
import {renderReact} from '../../functions/routes';
import create from './create';

var router = express.Router();
router.get("/", renderReact);
router.get("/new", renderReact);
router.post("/", create);

export default router;
