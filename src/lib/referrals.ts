import { createHash } from "crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // bez znaków mylących się (I, O, 0, 1)
export const REFERRAL_COOKIE_NAME = "ak_ref";
export const REFERRAL_COOKIE_MAX_AGE_DAYS = 90;

/** Generuje czytelny kod referencyjny, np. "MARTA-7F2Q" */
export function generateReferralCode(name: string): string {
  const base = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // usuń znaki diakrytyczne
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .slice(0, 6) || "PARTNER";

  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `${base}-${suffix}`;
}

/** Hashuje IP dla anty-duplikacyjnego liczenia kliknięć bez przechowywania surowego IP */
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip + (process.env.IP_HASH_SALT ?? "ak-salt")).digest("hex");
}