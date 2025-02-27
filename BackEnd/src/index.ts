import express from "express";
import cors from "cors"; // ✅ Import CORS middleware
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";

const app = express();

// ✅ Enable CORS for frontend (Angular - http://localhost:4200)
app.use(
  cors({
    origin: "http://localhost:4200", // Allow Angular app
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

// ✅ Load Routes AFTER enabling CORS
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

export default app;
