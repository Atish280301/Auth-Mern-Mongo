//backend/controllers/index.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Auths } from '../models/User.js';

export const signup = async(req, res) => {
    const {username, useremail, password, confirmpassword, role} = req.body;

    if(password !== confirmpassword) {
        return res.status(400).json({msg: "Password Do Not Match!"});
    }
    try {
        let existingUser = await Auths.findOne({useremail});
        if(existingUser) {
            return res.status(400).json({msg: 'User Already Exists'});
        }
        const HashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Auths({
            username, useremail, password: HashedPassword, role,
        });
        await newUser.save();
        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
}

export const signin = async (req, res) => {
    const {useremail, password} = req.body;

    try {
        const user = await Auths.findOne({useremail});
        if(!user) {
            return res.status(400).json({msg: "Invalid Credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = {
            user: {id: user._id, role: user.role},
        };
        jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '1h'},(err, token)=>{
            if(err) throw err;
            res.json({ username: user.username, useremail: user.useremail, role: user.role, token: token });
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}