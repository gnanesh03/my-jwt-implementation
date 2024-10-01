import crypto from "crypto";

// Function to verify JWT using public key
export default function verifyJWT(token, publicKey) {
  const [encodedHeader, encodedPayload, signature] = token.split(".");

  // Recompute the signature using the public key (RS256)
  const isSignatureValid = crypto
    .createVerify("RSA-SHA256")
    .update(`${encodedHeader}.${encodedPayload}`)
    .verify(publicKey, signature, "base64");

  if (!isSignatureValid) {
    throw new Error("Invalid signature");
  }

  // Decode payload
  const payload = JSON.parse(base64UrlDecode(encodedPayload));

  // Check if the token is expired
  if (payload.exp) {
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = payload.exp;

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
