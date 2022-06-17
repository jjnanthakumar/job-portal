import { access, F_OK } from "fs";
import { join } from "path";
import { createWriteStream } from "fs";
import { v4 as uuidv4 } from "uuid";
import { promisify } from "util";
import stream from 'stream'

const pipeline = promisify(stream.pipeline);


export const uploadProfilePicture = async (req, res) => {
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
}
export const uploadResume = async (req, res) => {
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
}

export const getResume = async (req, res) => {
    try {
        const address = join(__dirname, `../public/resume/${req.params.file}`);
        access(address, F_OK, (err) => {
            if (err) {
                res.status(404).json({
                    message: "File not found",
                });
                return;
            }
            res.sendFile(address);
        });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong :(" })
    }
}

export const getProfile = async (req, res) => {
    try {
        const address = join(__dirname, `../public/profile/${req.params.file}`);
        access(address, F_OK, (err) => {
            if (err) {
                res.status(404).json({
                    message: "File not found",
                });
                return;
            }
            res.sendFile(address);
        });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong :(" })
    }
}
