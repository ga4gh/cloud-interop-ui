import express from 'express';
import {renderReact} from '../../functions/routes';

var router = express.Router();
router.get("/", renderReact);

export default router;
