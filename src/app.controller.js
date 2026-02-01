import express from "express";
import cors from "cors";
import connectDB from "./database/connection.js";
import userRoutes from "./modules/user/user.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import { ENV } from "../config/env.service.js";
export const bootstrap = async() => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "Accept"],
      optionsSuccessStatus: 200,
    })
  );
  app.options("*", cors());
  app.use(express.json());
  await connectDB();
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.listen(ENV.PORT, () =>
    console.log(`🚀 Server running on port ${ENV.PORT}`)
  );
};