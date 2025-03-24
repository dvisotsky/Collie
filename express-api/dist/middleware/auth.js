import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/auth.js";
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Access token required" });
        return;
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ error: "Invalid token" });
            return;
        }
        req.user = user;
        next();
    });
};
//# sourceMappingURL=auth.js.map