import express from "express";
import { getUsers, getUserById, createUser } from "../controllers/user";
import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqQuery } from "../middleware/validate";
import { createUserBodySchema, getUserQuerySchema } from "../schema/user";

const router = express();

router.get(
  "/",
  authenticate,
  authorize("users.get"),
  validateReqQuery(getUserQuerySchema),
  getUsers,
);
router.get("/:id", authenticate, getUserById);

router.post("/", validateReqBody(createUserBodySchema), createUser);

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
