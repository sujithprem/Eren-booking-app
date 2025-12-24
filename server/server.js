import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();
const port = 3000;

// Connect DB first
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("server is Live!");
});
app.use('/api/inngest', serve({ client: inngest, functions }))

app.listen(port, () =>
  console.log(`Server Listening at http://localhost:${port}`)
);
