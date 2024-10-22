// Example usage:
import getRSAKeys from "./GenerateKeys.js";
import createJWT from "./Sign.js";
import verifyJWT from "./VerifyToken.js";
import dotenv from "dotenv";
dotenv.config();
const payload = { sub: "peter", user_role: "student" };

// generate public and private keys from function if you want
//let { publicKey, privateKey } = getRSAKeys();

let publicKey = process.env.PUBLIC_KEY;
let privateKey = process.env.PRIVATE_KEY;

// console.log(publicKey);
// console.log(privateKey);

// Create the token
let token = createJWT(payload, { privateKey: privateKey, expiresIn: 30 });
//token = ""

console.log("JWT Token:", token);
console.log();

// Verify the token

try {
  const verifiedPayload = verifyJWT(token, publicKey);
  console.log("THE TOKEN IS VALID :", verifiedPayload);
} catch (error) {
  console.error(error.message);
}
