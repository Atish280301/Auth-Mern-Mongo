// backend/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type:String, required: true},
    useremail: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['public','admin'], required: true},
},{timestamps: true });

export const Auths = mongoose.model('Auths',UserSchema);