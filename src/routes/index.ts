import { Router } from "express";
import userRoutes from './userRoutes'
import telcoRoutes from './telcoRoutes'
import contactRoutes from "./contactRoutes";
import express from 'express';

const router: Router = express.Router();

router.use('/user', userRoutes);
router.use('/telcos', telcoRoutes);
router.use('/contacts', contactRoutes)

export default router;