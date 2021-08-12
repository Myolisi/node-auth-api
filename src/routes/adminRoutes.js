import { Router } from 'express';
import admin from './admin/admin';
import checkAuth from '../utils/checkAuth';

const adminRoutes = Router();
adminRoutes.get('/all', checkAuth.auth, admin.getAll);
adminRoutes.get('/:id', checkAuth.auth, admin.getById);
adminRoutes.post('/create', admin.add);

export default adminRoutes;
