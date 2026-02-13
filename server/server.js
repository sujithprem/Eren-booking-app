import express from "express";
import dotenv from "dotenv";
import {inngest, functions} from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => { res.send("Backend running 🚀")});
app.use("/api/inngest", inngest.serve(functions));
app.use('/api/show', showRouter)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
