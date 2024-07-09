import express from "express";
import { getUsers, getUserById, createUser } from "../controllers/user";
import { auth } from "../middleware/auth";

const router = express();

router.get("/", auth, getUsers);
router.get("/:id", auth, getUserById);

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
