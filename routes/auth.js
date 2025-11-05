const express = require('express');
const router = express.Router();
const User = require('../models/User');



// Paso 1: Guardar nivel de ingles
router.post('/register/step1', async (req, res) => {
  try {
    const { nivelIngles } = req.body;

    if (!nivelIngles) {
      return res.status(400).json({
        success: false,
        message: 'Nivel de ingles es requerido'
      });
    }

    const newUser = new User({ nivelIngles });
    await newUser.save();

    res.json({
      success: true,
      userId: newUser._id
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al guardar nivel de ingles',
      error: error.message
    });
  }
});



// Paso 2: Guardar datos personales
router.post('/register/step2', async (req, res) => {
  try {
    const { userId, nombres, apellidos, edad, email } = req.body;

    if (!userId || !nombres || !apellidos || !edad || !email) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const emailExists = await User.findOne({ email, _id: { $ne: userId } });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'El correo electronico ya esta registrado'
      });
    }

    user.nombres = nombres;
    user.apellidos = apellidos;
    user.edad = edad;
    user.email = email;
    await user.save();

    res.json({
      success: true,
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al guardar datos personales',
      error: error.message
    });
  }
});



// Paso 3: Guardar username
router.post('/register/step3', async (req, res) => {
  try {
    const { userId, username } = req.body;

    if (!userId || !username) {
      return res.status(400).json({
        success: false,
        message: 'Usuario es requerido'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const usernameExists = await User.findOne({ username, _id: { $ne: userId } });
    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: 'El nombre de usuario ya existe'
      });
    }

    user.username = username;
    await user.save();

    res.json({
      success: true,
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al guardar username',
      error: error.message
    });
  }
});



// Paso 4: Completar registro con password
router.post('/register/complete', async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Password es requerido'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    user.password = password;
    user.registroCompleto = true;
    await user.save();

    res.json({
      success: true,
      message: 'Registro completado exitosamente',
      user: {
        username: user.username,
        email: user.email,
        nombres: user.nombres,
        apellidos: user.apellidos,
        nivelIngles: user.nivelIngles
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al completar registro',
      error: error.message
    });
  }
});



// Ruta de login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Intento de login:', { username });

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Usuario/Email y contrasena son requeridos'
      });
    }

    // Buscar por username o email
    const user = await User.findOne({ 
      $or: [
        { username: username },
        { email: username }
      ]
    });
    
    console.log('Usuario encontrado:', user ? 'Si' : 'No');
    console.log('Registro completo:', user?.registroCompleto);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario o email no encontrado'
      });
    }

    if (!user.registroCompleto) {
      return res.status(401).json({
        success: false,
        message: 'Debes completar el registro primero'
      });
    }

    if (user.password !== password) {
      console.log('Contraseña incorrecta');
      return res.status(401).json({
        success: false,
        message: 'Contraseña incorrecta'
      });
    }

    res.json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        nombres: user.nombres,
        apellidos: user.apellidos,
        nivelIngles: user.nivelIngles
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesion',
      error: error.message
    });
  }
});



module.exports = router;
