import express from 'express';
import {renderReact} from '../../functions/routes';
import create from './create';
import get from './get';
import search from './search';

var router = express.Router();
router.get("/", renderReact);
router.get("/:id/get", get);
router.get("/search", search);
router.post("/", create);
router.get("/:id", renderReact);

export default router;
