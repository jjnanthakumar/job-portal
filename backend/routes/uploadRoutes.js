import { Router } from "express";
import multer from "multer";
import { createWriteStream } from "fs";
import { v4 as uuidv4 } from "uuid";
import { promisify } from "util";
import stream from 'stream'

const pipeline = promisify(stream.pipeline);

const router = Router();

const upload = multer();

router.post("/resume", upload.single("file"), (req, res) => {
  const { file } = req;
  if (file.detectedFileExtension != ".pdf") {
    res.status(400).json({
      message: "Invalid format",
    });
  } else {
    const filename = `${uuidv4()}${file.detectedFileExtension}`;

    pipeline(
      file.stream,
      createWriteStream(`${__dirname}/../public/resume/${filename}`)
    )
      .then(() => {
        res.send({
          message: "File uploaded successfully",
          url: `/host/resume/${filename}`,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while uploading",
        });
      });
  }
});

router.post("/profile", upload.single("file"), (req, res) => {
  const { file } = req;
  if (
    file.detectedFileExtension != ".jpg" &&
    file.detectedFileExtension != ".png"
  ) {
    res.status(400).json({
      message: "Invalid format",
    });
  } else {
    const filename = `${uuidv4()}${file.detectedFileExtension}`;

    pipeline(
      file.stream,
      createWriteStream(`${__dirname}/../public/profile/${filename}`)
    )
      .then(() => {
        res.send({
          message: "Profile image uploaded successfully",
          url: `/host/profile/${filename}`,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while uploading",
        });
      });
  }
});

export default router;
