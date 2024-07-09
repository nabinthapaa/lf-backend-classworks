import express from "express";
import userRouter from './user';
import projectRouter from './project';

const router = express();

router.use('/users', userRouter);
router.use('/project', userRouter);


export default router;
