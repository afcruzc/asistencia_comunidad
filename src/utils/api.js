const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Función para obtener el token del localStorage
const getToken = () => localStorage.getItem('leaderToken');

// Función para agregar headers de autorización
const authHeaders = () => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// LÍDERES
export async function leaderLogin(email, password) {
  const res = await fetch(`${API_URL}/leaders/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error de login');
  }
  const data = await res.json();
  localStorage.setItem('leaderToken', data.token);
  localStorage.setItem('leaderData', JSON.stringify(data.leader));
  return data;
}

export async function getLeaderProfile() {
  const res = await fetch(`${API_URL}/leaders/me`, {
    
  });
  if (!res.ok) throw new Error('No autorizado');
  return res.json();
}

export function leaderLogout() {
  localStorage.removeItem('leaderToken');
  localStorage.removeItem('leaderData');
}

export function isLeaderLoggedIn() {
  return !!getToken();
}

export function getLeaderData() {
  const data = localStorage.getItem('leaderData');
  return data ? JSON.parse(data) : null;
}

// PERSONAS
export async function getPersons() {
  const res = await fetch(`${API_URL}/persons`);
  return res.json();
}
export async function createPerson(data) {
  const res = await fetch(`${API_URL}/persons`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function updatePerson(id, data) {
  const res = await fetch(`${API_URL}/persons/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function deletePerson(id) {
  const res = await fetch(`${API_URL}/persons/${id}`, { 
    method: 'DELETE',
    
  });
  return res.json();
}

// GRUPOS
export async function getGroups() {
  const res = await fetch(`${API_URL}/groups`, {
    
  });
  return res.json();
}
export async function createGroup(data) {
  const res = await fetch(`${API_URL}/groups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function updateGroup(id, data) {
  const res = await fetch(`${API_URL}/groups/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function deleteGroup(id) {
  const res = await fetch(`${API_URL}/groups/${id}`, { 
    method: 'DELETE',
    
  });
  return res.json();
}

// REUNIONES
export async function getMeetings() {
  const res = await fetch(`${API_URL}/meetings`, {
    
  });
  return res.json();
}
export async function createMeeting(data) {
  const res = await fetch(`${API_URL}/meetings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function updateMeeting(id, data) {
  const res = await fetch(`${API_URL}/meetings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function deleteMeeting(id) {
  const res = await fetch(`${API_URL}/meetings/${id}`, { 
    method: 'DELETE',
    
  });
  return res.json();
}

// ASISTENCIAS
export async function getAttendances() {
  const res = await fetch(`${API_URL}/attendances`, {
    
  });
  return res.json();
}
export async function createAttendance(data) {
  const res = await fetch(`${API_URL}/attendances`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function updateAttendance(id, data) {
  const res = await fetch(`${API_URL}/attendances/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function deleteAttendance(id) {
  const res = await fetch(`${API_URL}/attendances/${id}`, {
    method: 'DELETE',

  });
  return res.json();
}

// PERSONAS ELIMINADAS
export async function getDeletedPersons() {
  const res = await fetch(`${API_URL}/deleted-persons`);
  return res.json();
}
export async function createDeletedPerson(data) {
  const res = await fetch(`${API_URL}/deleted-persons`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
}