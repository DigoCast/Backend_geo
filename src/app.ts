import express from "express";
import cors from "cors";
import { continenteRoutes } from "./modules/continente/continente.routes.js";
import { paisRoutes } from "./modules/pais/pais.routes.js";
import { cidadeRoutes } from "./modules/cidade/cidade.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

app.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
  });
});

app.use("/continente", continenteRoutes);
app.use("/pais", paisRoutes);
app.use("/cidade", cidadeRoutes);

export { app };
