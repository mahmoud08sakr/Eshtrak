import express from "express";
import cors from "cors";
import connectDB from "./database/connection.js";
import userRoutes from "./modules/user/user.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import { ENV } from "../config/env.service.js";
export const bootstrap = () => {
  const app = express();
  app.use(
  cors({
    origin: true, // reflect request origin (e.g. http://localhost:3000)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    optionsSuccessStatus: 200,
  })
);
  app.use(express.json());
  connectDB();
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.listen(ENV.PORT, () =>
    console.log(`🚀 Server running on port ${ENV.PORT}`)
  );
};