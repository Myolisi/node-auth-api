import routes, { Router } from 'express';
import auth from './auth/auth';

const authRoutes = Router();

authRoutes.post('/login', auth.login);
authRoutes.post('/refresh', auth.refreshToken);

export default authRoutes;
