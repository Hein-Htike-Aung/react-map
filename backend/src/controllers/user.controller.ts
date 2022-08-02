
import { Request, Response, NextFunction } from 'express';
import { createError } from '../utils/createError';
import bcrypt from 'bcrypt';
import User from '../models/User.model';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const salt = await bcrypt.genSalt(+process.env.SALT);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const newUser = await user.save();
        res.status(200).json(newUser._id);

    } catch (error) {
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const email = req.body.email;

        const user = await User.findOne({ email });

        if (!user) return next(createError(401, 'Invalid Credentails'));

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )

        if (!validPassword) return next(createError(401, 'Invlaid Credentials'));

        res.status(200).json({ _id: user._id, username: user.username })

    } catch (error) {
        next(error);
    }
}