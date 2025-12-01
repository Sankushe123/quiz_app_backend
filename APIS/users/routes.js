import express from "express";
import { createUser, getAllUsers, getUserById } from "./controller.js";

const router = express.Router();

router.post("/create", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

export default router;
