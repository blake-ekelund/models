export function getAnonId() {
  if (typeof window === "undefined") return null;

  let anonId = localStorage.getItem("anon_id");
  if (!anonId) {
    anonId = crypto.randomUUID();
    localStorage.setItem("anon_id", anonId);
  }
  return anonId;
}
