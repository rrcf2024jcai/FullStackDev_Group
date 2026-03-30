import express from "express";
import clockRoutes from "../src/routes/clockRoutes.js";

const app = express();

app.use(express.json());

// Register routes
app.use("/clock", clockRoutes);

export default app;