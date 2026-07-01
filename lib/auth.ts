const cookieName = "noctra_admin";

function base64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function encodeText(value: string) {
  return new TextEncoder().encode(value);
}

async function signature(payload: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encodeText(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signed = await crypto.subtle.sign("HMAC", key, encodeText(payload));
  return base64Url(new Uint8Array(signed));
}

export function getAdminCookieName() {
  return cookieName;
}

export async function createAdminToken(secret: string) {
  const payload = base64Url(
    encodeText(
      JSON.stringify({
        role: "admin",
        exp: Date.now() + 1000 * 60 * 60 * 24 * 7
      })
    )
  );
  return `${payload}.${await signature(payload, secret)}`;
}

export async function verifyAdminToken(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = await signature(payload, secret);
  if (expected !== sig) return false;

  try {
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as {
      role?: string;
      exp?: number;
    };
    return json.role === "admin" && typeof json.exp === "number" && json.exp > Date.now();
  } catch {
    return false;
  }
}
