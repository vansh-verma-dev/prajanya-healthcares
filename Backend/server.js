import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://prajanya-healthcares.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});