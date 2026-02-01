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
      credentials: true,
    })
  );
  app.use(cors(corsOptions));
  app.use(express.json());
  await connectDB();
  app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
  next();
});
app.get("/", (req, res) => {
  res.json({ message: "API ALIVE" });
});

  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.listen(ENV.PORT, () =>
    console.log(`🚀 Server running on port ${ENV.PORT}`)
  );
};