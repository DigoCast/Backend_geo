import { Router } from "express";
import { CidadeController } from "./cidade.controller.js";

const router = Router();
const controller = new CidadeController();

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

router.get("/:id/clima", controller.getClima);

export { router as cidadeRoutes };