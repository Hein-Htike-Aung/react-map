import mongoose from "mongoose";


export interface UserDocument extends mongoose.Document {
    username: string,
    email: string
    password: string
}

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        }
    },
    { timestamps: true }
)

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;