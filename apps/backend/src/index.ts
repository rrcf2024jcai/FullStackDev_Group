console.log(">>> USING THIS BACKEND FILE <<<");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./prisma/prisma";
import employeeRoutes from "../src/routes/employeeRoutes";
import clockRoutes from "../src/routes/clockRoutes";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/clock", clockRoutes);

app.listen(port, "127.0.0.1", () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});

console.log(">>> BACKEND READY <<<");