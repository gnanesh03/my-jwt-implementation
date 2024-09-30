// Example usage:

import { createJWT } from "./Sign.js";
import { verifyJWT } from "./VerifyToken.js";

const payload = { sub: "peter" };
const secret = "mysecretkey";

// Create the token
let token = createJWT(payload, { secret: secret, expiresIn: "1h" });
console.log("JWT Token:", token);
console.log();

// Verify the token

try {
  const verifiedPayload = verifyJWT(token, secret);
  console.log("THE TOKEN IS VALID :", verifiedPayload);
} catch (error) {
  console.error(error.message);
}
