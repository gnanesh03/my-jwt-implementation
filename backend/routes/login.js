import express from "express";

const login_router = express.Router();

login_router.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Login route working");
});

export default login_router;
