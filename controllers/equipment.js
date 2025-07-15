import prisma from "../utils/prisma.js";
import { v4 as uuidv4 } from "uuid";
import { deleteImage, randomId } from "../utils/utils.js";
export const getEquipments = async (req, res) => {
  try {
    const equipments = await prisma.equipment.findMany();
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEquipment = async (req, res) => {
  try {
    const { name, quantity, gymId, id, ext } = req.body;
    let equipmentId = id;
    if (!req.file) equipmentId = randomId();
    const equipment = await prisma.equipment.create({
      data: {
        equipmentId,
        name,
        imgUrl: req.file
          ? `uploads/equipments/${equipmentId}${ext}`
          : undefined,
        gymId,
        quantity: quantity ? parseInt(quantity) : 1,
      },
    });
    res.json(equipment);
  } catch (error) {
    console.error("error creating equipment", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateEquipment = async (req, res) => {
  console.log("reqq", req.body);
  try {
    const { id } = req.params;
    const { name, quantity, ext } = req.body;
    req.file && (await deleteImage(id, "equipments", ext));
    const equipment = await prisma.equipment.update({
      where: { equipmentId: id },
      data: {
        name,
        quantity: quantity ? parseInt(quantity) : undefined,
        imgUrl: req.file ? `uploads/equipments/${id}${ext}` : undefined,
      },
    });
    res.json(equipment);
  } catch (error) {
    console.error("error updating equipment", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await prisma.equipment.delete({
      where: { equipmentId: id },
    });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
