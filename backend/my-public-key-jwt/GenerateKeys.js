import crypto from "crypto";

export default function getRSAKeys() {
  // 1. Generate RSA Key Pair (using crypto.generateKeyPairSync). It is random everytime
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048, // Length of the key in bits
    publicKeyEncoding: {
      type: "spki", // Recommended to use 'spki' for public key encoding
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8", // Recommended to use 'pkcs8' for private key encoding
      format: "pem",
    },
  });

  return { publicKey, privateKey };
}
