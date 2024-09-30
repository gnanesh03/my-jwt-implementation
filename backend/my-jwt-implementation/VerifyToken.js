import crypto from "crypto";

// Function to verify JWT
export function verifyJWT(token, secret) {
  const [encodedHeader, encodedPayload, signature] = token.split(".");

  // Recompute the signature
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  // Compare signatures
  if (signature !== expectedSignature) {
    throw new Error("Invalid signature");
  }

  // Decode payload
  const payload = JSON.parse(base64UrlDecode(encodedPayload));

  // Check if the token is expired
  if (payload.exp) {
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = payload.exp;
    // console.log();
    // console.log(new Date().getHours());
    // console.log(new Date(expirationTime * 1000).getHours());

    if (currentTime > expirationTime) {
      throw new Error("JWT is expired");
    }
  }

  // Signature is valid and token is not expired, return decoded payload
  return payload;
}

// Helper function to base64-url decode a string
function base64UrlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(str, "base64").toString();
}
