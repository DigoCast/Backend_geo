import { Router } from "express";
import { ContinenteController } from "./continente.controller.js";

const router = Router();
const controller = new ContinenteController();

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export { router as continenteRoutes };