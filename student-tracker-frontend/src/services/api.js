const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "/api";

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
export const authApi = {

  register: async (student) => {

    const response = await fetch(
      "/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify(student)
      }
    );


    const data = await response.json();


    if (!response.ok) {
      throw new Error(
        data.message ||
        "Registration failed."
      );
    }


    return data;
  },


  login: async (credentials) => {

    const response = await fetch(
      "/api/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify(credentials)
      }
    );


    const data = await response.json();


    if (!response.ok) {
      throw new Error(
        data.message ||
        "Invalid email or password."
      );
    }


    return data;
  },


  getCurrentStudent: async () => {

    const response = await fetch(
      "/api/auth/me",
      {
        credentials: "include"
      }
    );


    if (!response.ok) {
      return null;
    }


    return response.json();
  },


  logout: async () => {

    await fetch(
      "/api/auth/logout",
      {
        method: "POST",
        credentials: "include"
      }
    );
  }
};