// server.js - Servidor Express con conexión a MongoDB
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON en las peticiones
app.use(express.json());

// URI de conexión a MongoDB
// Para MongoDB local: 'mongodb://localhost:27017/nombre-base-datos'
// Para MongoDB Atlas: 'mongodb+srv://usuario:password@cluster...'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mi-database';

// Conectar a MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.log('Error conectando a MongoDB:', error.message);
  });

// Esquema básico para un modelo de usuario
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Modelo de usuario basado en el esquema
const User = mongoose.model('User', userSchema);

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ message: 'Servidor Express con MongoDB funcionando' });
});

// Ruta para obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para crear un nuevo usuario
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener un usuario por ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});