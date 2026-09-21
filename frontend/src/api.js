const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const TOKEN_KEY = "reportflow_access_token";
const USER_KEY = "reportflow_user";

async function request(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = new Headers(options.headers || {});

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = payload?.detail;
    const message = Array.isArray(detail)
      ? detail.map((item) => item.msg).join(", ")
      : detail || "The request could not be completed.";
    throw new Error(message);
  }

  return payload;
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null;
  } catch {
    return null;
  }
}

export async function login(credentials) {
  const result = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  localStorage.setItem(TOKEN_KEY, result.access_token);
  localStorage.setItem(USER_KEY, JSON.stringify({
    fullName: result.full_name,
    email: result.email,
  }));
  return result;
}

export async function register(user) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export async function getReports() {
  const reports = await request("/reports/");
  return reports.map(normalizeReport);
}

export async function createReport(report) {
  const result = await request("/reports/", {
    method: "POST",
    body: JSON.stringify({
      title: report.title,
      content: JSON.stringify(report),
    }),
  });

  return {
    ...report,
    id: result.id,
  };
}

export async function updateReport(report) {
  const saved = await request(`/reports/${report.id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: report.title,
      content: JSON.stringify(report),
    }),
  });

  return normalizeReport(saved);
}

function normalizeReport(report) {
  let details = {};

  try {
    details = JSON.parse(report.content);
  } catch {
    details = { description: report.content };
  }

  return {
    ...details,
    id: report.id || report._id,
    title: report.title,
    date: details.date || formatDate(report.created_at),
    status: details.status || "Completed",
    type: details.type || details.eventType || "Event Report",
  };
}

function formatDate(value) {
  if (!value) return "Unknown date";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
