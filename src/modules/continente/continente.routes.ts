import { Router } from "express";
import { continenteController } from "./continente.controller.js";

const router = Router();
const controller = new continenteController();

router.post("/", controller.create);
router.get("/", controller.findAll);
// router.get("/:id", controller.findOne);
// router.put("/:id", controller.update);
// router.delete("/:id", controller.delete);

export { router as continenteRoutes };