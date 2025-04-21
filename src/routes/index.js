import { Router } from "express";
import customerRoutes from "./customer.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

// routes
router.use("/auth", authRoutes)
router.use("/customer", customerRoutes)

export default router;