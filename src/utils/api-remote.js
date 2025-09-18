// Configuración para servidor remoto
const API_URL = process.env.REACT_APP_API_URL || 'https://tu-servidor-remoto.com/api';

// Función para obtener el token del localStorage
const getToken = () => localStorage.getItem('leaderToken');

// Función para agregar headers de autorización
const authHeaders = () => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Función para manejar errores de red
const handleNetworkError = (error) => {
  console.error('Error de red:', error);
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    throw new Error('No se puede conectar al servidor. Verifica la URL del API.');
  }
  throw error;
};

// LÍDERES
export async function leaderLogin(email, password) {
  try {
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
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function getLeaderProfile() {
  try {
    const res = await fetch(`${API_URL}/leaders/me`, {
      headers: { ...authHeaders() },
    });
    if (!res.ok) throw new Error('No autorizado');
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
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
  try {
    const res = await fetch(`${API_URL}/persons`, {
      headers: { ...authHeaders() },
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function createPerson(data) {
  try {
    const res = await fetch(`${API_URL}/persons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function updatePerson(id, data) {
  try {
    const res = await fetch(`${API_URL}/persons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function deletePerson(id) {
  try {
    const res = await fetch(`${API_URL}/persons/${id}`, { 
      method: 'DELETE',
      headers: { ...authHeaders() },
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

// GRUPOS
export async function getGroups() {
  try {
    const res = await fetch(`${API_URL}/groups`, {
      headers: { ...authHeaders() },
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function createGroup(data) {
  try {
    const res = await fetch(`${API_URL}/groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function updateGroup(id, data) {
  try {
    const res = await fetch(`${API_URL}/groups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function deleteGroup(id) {
  try {
    const res = await fetch(`${API_URL}/groups/${id}`, { 
      method: 'DELETE',
      headers: { ...authHeaders() },
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

// REUNIONES
export async function getMeetings() {
  try {
    const res = await fetch(`${API_URL}/meetings`, {
      headers: { ...authHeaders() },
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function createMeeting(data) {
  try {
    const res = await fetch(`${API_URL}/meetings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function updateMeeting(id, data) {
  try {
    const res = await fetch(`${API_URL}/meetings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function deleteMeeting(id) {
  try {
    const res = await fetch(`${API_URL}/meetings/${id}`, { 
      method: 'DELETE',
      headers: { ...authHeaders() },
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

// ASISTENCIAS
export async function getAttendances() {
  try {
    const res = await fetch(`${API_URL}/attendances`, {
      headers: { ...authHeaders() },
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function createAttendance(data) {
  try {
    const res = await fetch(`${API_URL}/attendances`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function updateAttendance(id, data) {
  try {
    const res = await fetch(`${API_URL}/attendances/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function deleteAttendance(id) {
  try {
    const res = await fetch(`${API_URL}/attendances/${id}`, { 
      method: 'DELETE',
      headers: { ...authHeaders() },
    });
    return res.json();
  } catch (error) {
    handleNetworkError(error);
  }
}

// Función para probar la conexión
export async function testConnection() {
  try {
    const response = await fetch(`${API_URL.replace('/api', '')}/`);
    return {
      success: response.ok,
      status: response.status,
      data: await response.text()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}



