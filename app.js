import express from "express";
import cors from "cors";
import morgan from "morgan";

import inventoryRoutes from "./routes/inventoryRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/inventory", inventoryRoutes);

app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("Aura Engine API Running Successfully");
});
export default app;