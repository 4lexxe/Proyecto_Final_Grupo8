const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 6
  },
  nombres: {
    type: String,
    trim: true
  },
  apellidos: {
    type: String,
    trim: true
  },
  edad: {
    type: Number,
    min: 1
  },
  nivelIngles: {
    type: String,
    enum: ['principiante', 'basico', 'intermedio', 'avanzado', 'experto']
  },
  registroCompleto: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



module.exports = mongoose.model('User', userSchema);
