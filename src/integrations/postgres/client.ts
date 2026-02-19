// En desarrollo, usar el mismo host que la página (así funciona desde el móvil en la red local)
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV && typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:3001/api`
    : "/api");

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

async function request<T = unknown>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `Error ${response.status}`);
  }

  return response.json();
}

export const db = {
  get: <T = unknown>(endpoint: string) => request<T>(endpoint),

  post: <T = unknown>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "POST", body }),

  put: <T = unknown>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "PUT", body }),

  patch: <T = unknown>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "PATCH", body }),

  delete: <T = unknown>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};
