import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { createError } from '../utils/createError';

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) next(createError(401, 'You are not authenticated'));

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, user: any) => {
        if (err) return next(createError(401, 'Token is not valid'));

        req['user'] = user;

        next();
    });
}