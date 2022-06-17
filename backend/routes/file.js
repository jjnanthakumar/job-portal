import { Router } from "express";
import multer from "multer";
import { getProfile, getResume, uploadProfilePicture, uploadResume } from "../controllers/file";

const router = Router();

const upload = multer();

router.get("/resume/:file", getResume);
router.get("/profilepic/:file", getProfile);
router.post("/resume", upload.single("file"), uploadResume);
router.post("/profilepic", upload.single("file"), uploadProfilePicture);


export default router;
