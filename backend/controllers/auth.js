// import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import JobApplicant from "../models/JobApplicant.js";
import Recruiter from "../models/Recruiter.js";

const SECRET = process.env.SECRET || 'nandy@123'

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.json({ message: "Please register first :)" })
        const isPasscheck = await bcrypt.compare(password, existingUser.password);
        if (!isPasscheck) return res.json({ message: "Incorrect Password!" })
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET, { expiresIn: "6h" })
        res.status(200).json({ result: existingUser, token })
    } catch (err) {
        res.status(500).json({ message: "Something went wrong :(" })
    }
}

export const signUp = async (req, res) => {
    const { email, password, type } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.json({ message: "Email already exists! Please login :)" })
        const hashedPass = await bcrypt.hash(password, 12)
        const user = await User.create({ email, password: hashedPass, type: type })
        const userDetails = user.type == "recruiter"
            ? await Recruiter.create({
                userId: user._id,
                name: data.name,
                contactNumber: data.contactNumber,
                bio: data.bio,
            })
            : JobApplicant.create({
                userId: user._id,
                name: data.name,
                education: data.education,
                skills: data.skills,
                rating: data.rating,
                resume: data.resume,
                profile: data.profile,
            });

        const token = jwt.sign({ email: user.email, id: user._id }, SECRET, { expiresIn: "6h" })
        res.status(201).json({ user, token })
    } catch (err) {
        res.status(500).json({ message: "Something went wrong :(" })
    }
}