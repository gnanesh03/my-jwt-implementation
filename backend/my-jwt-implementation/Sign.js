import crypto from "crypto";
import { v1 as uuidv1 } from "uuid"; // For version 1 UUID
// Function to create JWT
export default function createJWT(payload, { secret, expiresIn }) {
  // Header
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  // Add expiration time to payload if expiresIn is provided
  if (expiresIn) {
    const expInSeconds =
      Math.floor(Date.now() / 1000) + parseExpiresIn(expiresIn);
    const expFormatted = formatExpirationDate(expInSeconds); // Convert to readable format
    payload.expirationDate = expFormatted; // Add 'exp' claim to the payload as a readable date string
    payload.exp = expInSeconds; // Store 'exp' claim as a Unix timestamp
  }

  // Generate a Unique ID for the token
  const unique_id = uuidv1();
  //console.log(uniqueId); // Example output: '110e8400-e29b-41d4-a716-446655440000'
  payload.token_id = unique_id;

  // Base64-url encode the header and payload
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  // Signature: HMAC SHA256 (header + payload)
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  // Combine encodedHeader, encodedPayload, and signature to form the JWT
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Helper function to base64-url encode a string
function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

// Helper function to parse the expiresIn string or number into seconds
function parseExpiresIn(expiresIn) {
  if (typeof expiresIn === "number") {
    return expiresIn;
  }

  const timeUnits = {
    ms: 1 / 1000, // Milliseconds to seconds
    s: 1, // Seconds
    m: 60, // Minutes to seconds
    h: 60 * 60, // Hours to seconds
    d: 24 * 60 * 60, // Days to seconds
  };

  const regex = /^(\d+)(ms|s|m|h|d)$/;
  const match = expiresIn.match(regex);
  if (!match) {
    throw new Error(
      "Invalid expiresIn format. Use a number or a string like '2d', '10h', '7d'."
    );
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  return value * timeUnits[unit];
}

// Helper function to format the expiration time to "YYYY-MM-DD-HH:mm:ss"
function formatExpirationDate(expirationTimeInSeconds) {
  const date = new Date(expirationTimeInSeconds * 1000); // Convert seconds to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
}
