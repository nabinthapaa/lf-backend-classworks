
import express from "express";

const router = express();

router.get("/", (req, res)=>{
  res.json({
    message: "Projects get"
  })
});

router.post("/", (req, res)=>{
  res.json({
    message: "Pojects Created"
  })
});

router.put("/", (req, res)=>{
  res.json({
    message: "Pojects Updated"
  })
});

router.delete("/", (req, res)=>{
  res.json({
    message: "Pojects deleted"
  })
});

export default router;
