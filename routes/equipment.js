import express from "express";
import {
  createEquipment,
  getEquipments,
  updateEquipment,
  deleteEquipment,
} from "../controllers/equipment.js";
import multer from "multer";
import { randomId } from "../utils/utils.js";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_, file, cb) => cb(null, "uploads/equipments"),
  filename: (req, file, cb) => {
    const id = req.params.id || randomId();
    const ext = path.extname(file.originalname);
    req.body.ext = ext;
    if (!req.params.id) req.body.id = id;
    cb(null, id + ext);
  },
});

const upload = multer({ storage: storage });

router.get("/list", getEquipments);
router.post("/create", upload.single("image"), createEquipment);

router.patch("/:id", upload.single("image"), updateEquipment);

router.delete("/:id", deleteEquipment);

export default router;
