import mongoose from "mongoose";


export interface PinDocument extends mongoose.Document {
    username: string;
    title: string;
    desc: string;
    rating: number;
    longitude: number;
    latitude: number;
}

const PinSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            min: 3,
            max: 60,
        },
        desc: {
            type: String,
            required: true,
            min: 3
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        longitude: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

const Pin = mongoose.model<PinDocument>('Pin', PinSchema);

export default Pin;