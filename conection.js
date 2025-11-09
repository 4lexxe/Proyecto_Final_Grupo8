const mongoose = require('mongoose');

// Funcion para conectar a MongoDB
const connectDB = async () => {
  try {
    // URI de conexion
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/FPW_Grupo8';

    // Opciones de conexion
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    // Conectar
    const conn = await mongoose.connect(MONGODB_URI, options);

    console.log(`MongoDB Conectado: ${conn.connection.host}`);
    console.log(`Base de datos: ${conn.connection.name}`);

    // Eventos de conexion
    mongoose.connection.on('error', (err) => {
      console.error('Error de MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB desconectado');
    });

    // Manejo de cierre
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB desconectado - aplicacion terminada');
      process.exit(0);
    });

  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    console.log('Asegurate de que MongoDB este ejecutandose');
    console.log('Verifica tu usuario y contraseña en MongoDB Atlas');
    process.exit(1);
  }
};

module.exports = connectDB;
