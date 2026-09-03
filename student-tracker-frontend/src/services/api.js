const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options
  });
  if (!response.ok) throw new Error((await response.text()) || `Request failed: ${response.status}`);
  return response.status === 204 ? null : response.json();
}

export const assignmentApi = {
  getAll: () => request("/assignments"),
  create: (data) => request("/assignments", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => request(`/assignments/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id) => request(`/assignments/${id}`, { method: "DELETE" })
};

export const courseApi = {
  getAll: () => request("/courses"),
  create: (data) => request("/courses", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => request(`/courses/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id) => request(`/courses/${id}`, { method: "DELETE" })
};
