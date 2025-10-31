import { Router } from "express";
import { PaisController } from "./pais.controller.js";

const router = Router();
const controller = new PaisController();

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export { router as paisRoutes };