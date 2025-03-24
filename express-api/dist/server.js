import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import groupsRouter from "./routes/groups.js";
import usersRouter from "./routes/users.js";
import { authenticateToken } from "./middleware/auth.js";
const app = express();
const port = 8000;
// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Routes
app.use("/api/users", usersRouter);
app.use("/api/groups", authenticateToken, groupsRouter);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map