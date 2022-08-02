import { loginSchema, registerSchema } from './../schemas/user.schema';
import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { login, register } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), register);

router.post('/login', validateRequest(loginSchema), login);

export default router;