/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/http.ts
const RAW_BASE = (import.meta.env.VITE_API_BASE ?? "").trim();
// Fail fast if base is missing 
if (!RAW_BASE) {
  if (location.port === "5173") {
    console.warn("[HTTP] VITE_API_BASE empty; using dev fallback http://localhost:5192/api");
  } else {
    throw new Error("VITE_API_BASE is not set. Put it in .env.local and restart Vite.");
  }
}
const API_BASE = (RAW_BASE || "http://localhost:5192/api").replace(/\/+$/, "");

type Options = RequestInit & { json?: unknown };

async function request<T>(path: string, init: Options = {}): Promise<T> {
  const url = `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

  const headers = new Headers(init.headers);
  if (init.json !== undefined) headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  //  Log the exact URL 
  console.debug("[HTTP]", init.method ?? "GET", url);

  const res = await fetch(url, {
    ...init,
    body: init.json !== undefined ? JSON.stringify(init.json) : init.body,
    headers
  });

  if (res.status === 204) return undefined as unknown as T;

  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");
  const payload = isJson ? await res.json().catch(() => undefined) : await res.text();

  if (!res.ok) {
    const message =
      (isJson && (payload as any)?.detail) ||
      (isJson && (payload as any)?.title) ||
      (typeof payload === "string" ? payload.slice(0, 400) : res.statusText);
    throw new Error(message || `HTTP ${res.status}`);
  }

  if (!isJson) {
    const snippet = typeof payload === "string" ? payload.slice(0, 120) : "";
    throw new Error(`Expected JSON but received ${ct || "unknown"}. ${snippet}`);
  }

  return payload as T;
}

export const http = {
  get:  <T>(p: string) => request<T>(p),
  post: <T>(p: string, body: unknown) => request<T>(p, { method: "POST", json: body }),
  put:  <T>(p: string, body: unknown) => request<T>(p, { method: "PUT",  json: body }),
  del:  (p: string) => request<void>(p, { method: "DELETE" })
};
