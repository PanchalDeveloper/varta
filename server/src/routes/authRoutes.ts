import { Router } from "express";
import { loginContext, registerContext } from "../contexts/authContexts.js";

const router = Router();

// Login [Post]
router.post("/login", loginContext);

// Register [Post]
router.post("/register", registerContext);

export default router;
