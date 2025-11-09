const express = require('express');
const cors = require('cors');
// Load environment variables before importing modules that use them
require('dotenv').config();
const connectDB = require('./conection');
const authRoutes = require('./routes/auth');
const membersRoutes = require('./routes/members');



// Configuracion inicial
const app = express();
const PORT = process.env.PORT || 5000;



// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Conectar a MongoDB
connectDB();



// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/members', membersRoutes);



// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: 'Servidor funcionando correctamente',
    status: 'ok',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login'
    }
  });
});



// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
  console.log(`Base de datos: MongoDB`);
});



module.exports = app;