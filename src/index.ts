import crypto from "crypto"

export const verifyAppProxySignature = (signature: string, shopifyAPISecret: string, data: string) => {
  const hmac = computeHMAC(shopifyAPISecret, data)
  const digest = Buffer.from(hmac, "utf-8")
  const checksum = Buffer.from(signature, "utf-8")

  return digest.length === checksum.length && crypto.timingSafeEqual(digest, checksum)
}

export const transformRecordToSortedKeyValueString = (object: Record<string, any>) => {
  return Object.keys(object)
    .sort()
    .map(key => `${key}=${object[key]}`)
    .join("")
}

const computeHMAC = (secret: string, data: string) => {
  return crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex")
}