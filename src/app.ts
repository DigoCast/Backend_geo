import express from "express";
import cors from "cors";
import { continenteRoutes } from "./modules/continente/continente.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
  });
});

app.use("/continentes", continenteRoutes);

export { app };
