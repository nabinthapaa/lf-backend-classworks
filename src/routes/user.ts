import express from "express";
import { getUsers, getUserById, createUser } from "../controllers/user";
import { authenticate, authorize } from "../middleware/auth";

const router = express();

router.get("/", authenticate, authorize("users.get"), getUsers);
router.get("/:id", authenticate, getUserById);

router.post("/", createUser);

router.put("/:id", (req, res) => {
  res.json({
    message: "User Updated",
  });
});

router.delete("/:id", (req, res) => {
  res.json({
    message: "User deleted",
  });
});

export default router;
