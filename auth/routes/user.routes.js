import express from 'express';
import { login, register, verify } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', verify);

export default router;