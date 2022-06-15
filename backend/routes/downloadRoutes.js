import { Router } from "express";
import { access, F_OK } from "fs";
import { join } from "path";

const router = Router();

router.get("/resume/:file", (req, res) => {
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
});

router.get("/profile/:file", (req, res) => {
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
});

export default router;
