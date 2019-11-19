import express from 'express';
import create from './create';
import put from './put';

var router = express.Router();
router.post("/", create);
router.put("/", put);

export default router;
