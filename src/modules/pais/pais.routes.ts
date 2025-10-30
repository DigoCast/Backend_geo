import { Router } from "express";
import { paisController } from "./pais.controller.js";

const router = Router();
const controller = new paisController();

router.post("/", controller.create);

export { router as paisRoutes };