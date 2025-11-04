import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioRegister from '../../components/FormularioRegister';
import Celebration from '../../components/Celebration';
import '../../assets/css/login.css';

const Register = () => {
    const [paso, setPaso] = useState(1); // 1: nivel, 2: nombres, 3: usuario, 4: contraseña
    const [formData, setFormData] = useState({ 
        nombres: '',
        apellidos: '',
        username: '', 
        password: '', 
        confirmPassword: '',
        nivelIngles: ''
    });
    const [error, setError] = useState('');
    const [mensajeMonstruo, setMensajeMonstruo] = useState('¿Cuánto inglés sabes?');
    const [mostrarCelebracion, setMostrarCelebracion] = useState(false);
    
    const navigate = useNavigate();

    const mensajesPorNivel = {
        'principiante': '¡No te preocupes! Arranquemos de cero.',
        'basico': '¡Eso está muy bien!',
        'intermedio': '¡Excelente! Continuemos mejorando.',
        'avanzado': '¡Muy bien, empecemos desde ahí!',
        'experto': '¡Increíble nivel! Sigamos avanzando.'
    };

    const generarUsuarioRandom = (nombres, apellidos) => {
        const primerNombre = nombres.split(' ')[0].toLowerCase();
        const primerApellido = apellidos.split(' ')[0].toLowerCase();
        const numeros = Math.floor(Math.random() * 1000);
        return `${primerNombre}.${primerApellido}${numeros}`;
    };

    const handleNombresChange = (e) => {
        setFormData({ ...formData, nombres: e.target.value });
    };

    const handleApellidosChange = (e) => {
        setFormData({ ...formData, apellidos: e.target.value });
    };

    const handleClaveChange = (e) => {
        setFormData({ ...formData, password: e.target.value });
    };

    const handleConfirmClaveChange = (e) => {
        setFormData({ ...formData, confirmPassword: e.target.value });
    };

    const handleNivelInglesChange = (e) => {
        const nivel = e.target.value;
        setFormData({ ...formData, nivelIngles: nivel });
        setMensajeMonstruo(mensajesPorNivel[nivel] || '¿Cuánto inglés sabes?');
    };

    const handleContinuarNivel = (e) => {
        e.preventDefault();
        if (!formData.nivelIngles) {
            setError('Por favor selecciona tu nivel de inglés');
            return;
        }
        setError('');
        setMensajeMonstruo('Bien, empecemos registrándote');
        setPaso(2);
    };

    const handleContinuarNombres = (e) => {
        e.preventDefault();
        if (!formData.nombres || !formData.apellidos) {
            setError('Por favor completa nombres y apellidos');
            return;
        }
        setError('');
        const usuarioGenerado = generarUsuarioRandom(formData.nombres, formData.apellidos);
        setFormData({ ...formData, username: usuarioGenerado });
        setMensajeMonstruo(`Tu usuario será: ${usuarioGenerado}`);
        setPaso(3);
    };

    const handleContinuarUsuario = (e) => {
        e.preventDefault();
        const primerNombre = formData.nombres.split(' ')[0];
        setMensajeMonstruo(`Okey ${primerNombre}, para terminar tu registro crea una contraseña`);
        setPaso(4);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (!formData.password || !formData.confirmPassword) {
            setError('Por favor completa todos los campos');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        // Aquí puedes agregar tu lógica de registro
        console.log('Registro enviado:', formData);
        
        // Mostrar celebración
        setMostrarCelebracion(true);
    };

    const handleCelebrationComplete = () => {
        // Redirigir al home después de la celebración
        navigate('/');
    };

    const handleIniciarSesion = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    if (mostrarCelebracion) {
        return <Celebration onComplete={handleCelebrationComplete} />;
    }

    return (
        <div className="login-page">
            <div className="login">
                <div className="monster-container">
                    <div className="speech-bubble">
                        {mensajeMonstruo}
                    </div>
                    <img src="/src/assets/img/anotando/anotando.png" className="monster-static" alt="Monster" />
                </div>
                <FormularioRegister
                    paso={paso}
                    formData={formData}
                    onNombresChange={handleNombresChange}
                    onApellidosChange={handleApellidosChange}
                    onClaveChange={handleClaveChange}
                    onConfirmClaveChange={handleConfirmClaveChange}
                    onNivelInglesChange={handleNivelInglesChange}
                    onContinuarNivel={handleContinuarNivel}
                    onContinuarNombres={handleContinuarNombres}
                    onContinuarUsuario={handleContinuarUsuario}
                    onSubmit={handleSubmit}
                    onIniciarSesion={handleIniciarSesion}
                    error={error}
                />
            </div>
        </div>
    );
};

export default Register;

