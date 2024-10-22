import express from "express";
import createJWT from "../my-jwt-implementation/Sign.js";
import verifyJWT from "../my-jwt-implementation/VerifyToken.js";
import { serialize } from "cookie";

const login_router = express.Router();

login_router.post("/login", (req, res) => {
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
    //  console.log("Token: ", token);

    // Set a http only cookie for storing the jwt token
    const serialized = serialize("JWT_TOKEN", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600,
      path: "/",
    });

    // Set the cookie in the response headers
    res.setHeader("Set-Cookie", serialized);

    // Send the response with a 200 status
    res.status(200).send("JWT is successfully set");

    const decoded = verifyJWT(token, secret);

    // console.log(decoded);
  } catch (err) {
    console.log(err);
  }
});

login_router.post("/update-profile", (req, res) => {});

export default login_router;
