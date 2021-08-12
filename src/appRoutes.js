import { Router } from 'express';
import adminRoutes from './routes/adminRoutes';
import authRoutes from './routes/authRoutes';

const appRoutes = Router();

appRoutes.use('/admin', adminRoutes);
appRoutes.use('/auth', authRoutes);

export default appRoutes;
