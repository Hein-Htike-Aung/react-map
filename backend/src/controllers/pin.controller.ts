import { Request, Response, NextFunction } from 'express';
import Pin from '../models/Pin.model';
import { createError } from '../utils/createError';

export const createPin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pin = new Pin(req.body);

        const newPin = await pin.save();

        res.status(200).json(newPin);

    } catch (error) {
        next(error);
    }
}

export const getAllPins = async (req: Request, res: Response, next: NextFunction) => {
    const pins = await Pin.find();

    res.status(200).json(pins);
}
