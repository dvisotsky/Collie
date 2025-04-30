import express from "express";
import { register, login, getProfile, refreshToken, } from "../controllers/users.js";
import { authenticateToken, authenticateRefreshToken, } from "../middleware/auth.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", authenticateRefreshToken, refreshToken);
router.get("/profile", authenticateToken, getProfile);
export default router;
//# sourceMappingURL=users.js.map