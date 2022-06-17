import Job from "../models/Job";

export const createJob = async (req, res) => {
    const job = new Job({ ...req.body, date: new Date().toISOString(), creator: req.userId });
    const user = req.user
    if (user.type != "recruiter") {
        res.status(401).json({
            message: "You don't have permissions to add jobs",
        });
        return;
    }
    try {
        await job.save();
        res.status(201).json(job)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const getJobs = async (req, res) => {

}