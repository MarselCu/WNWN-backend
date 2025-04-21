import { Router } from "express";

const router = Router();

// Sign up customer
router.post("/customer/signup", () => console.log("sign up customer"));
// Sign in customer
router.post("/customer/signin", () => console.log("sign in customer"));
// Sign up store owner
router.post("/store-owner/signup", () => console.log("sign up store owner"));
// Sign in store owner
router.post("/store-owner/signin", () => console.log("sign in store owner"));
// Sign in store admin
router.post("/store-admin/signin", () => console.log("sign in store admin"));

export default router;
