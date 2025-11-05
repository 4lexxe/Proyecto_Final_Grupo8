const API_URL = 'http://localhost:5000/api/auth';



export const authService = {
  async registerStep1(nivelIngles) {
    try {
      const response = await fetch(`${API_URL}/register/step1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nivelIngles }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en paso 1');
      return data;
    } catch (error) {
      throw error;
    }
  },

  async registerStep2(userId, nombres, apellidos, edad, email) {
    try {
      const response = await fetch(`${API_URL}/register/step2`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, nombres, apellidos, edad, email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en paso 2');
      return data;
    } catch (error) {
      throw error;
    }
  },

  async registerStep3(userId, username) {
    try {
      const response = await fetch(`${API_URL}/register/step3`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, username }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en paso 3');
      return data;
    } catch (error) {
      throw error;
    }
  },

  async registerComplete(userId, password) {
    try {
      const response = await fetch(`${API_URL}/register/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al completar registro');
      return data;
    } catch (error) {
      throw error;
    }
  },

  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesion');
      }

      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};
