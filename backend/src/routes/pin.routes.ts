import { createPinSchema } from './../schemas/pin.schema';
import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { createPin, getAllPins } from '../controllers/pin.controller';

const router = express.Router();

router.post('/', validateRequest(createPinSchema), createPin);

router.get('/', getAllPins);

export default router;