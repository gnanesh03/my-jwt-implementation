import express from "express";
import createJWT from "../my-jwt-implementation/Sign.js";
import verifyJWT from "../my-jwt-implementation/VerifyToken.js";
const login_router = express.Router();

login_router.post("/login", (req, res) => {
  console.log(req.body);

  const sub = req.body.email;

  // After verifying the identity of the user
  const secret = "American Dragon Jake Long";
  // get the user role from the user table from the database
  const user_role = "admin";
  try {
    const token = createJWT(
      { sub: sub, user_role: user_role, permissions: "read write delete" },
      { secret: secret, expiresIn: "2h" }
    );
    console.log("Token: ", token);

    res.send(token);

    const decoded = verifyJWT(token, secret);

    console.log(decoded);
  } catch (err) {
    console.log(err);
  }
});

login_router.post("/update-profile", (req, res) => {});

export default login_router;
