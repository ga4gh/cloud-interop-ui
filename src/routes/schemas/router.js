import express from 'express';
import get from './get';

var router = express.Router();
router.get("/:schema", get);

export default router;
