export const isDebug = process.env.NODE_ENV !== "production";

export const getDomain =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
