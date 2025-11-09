import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import FormularioRegister from '../../components/FormularioRegister';
import Celebration from '../../components/Celebration';
import '../../assets/css/login.css';

const Register = () => {
    const [paso, setPaso] = useState(1);
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({ 
        nombres: '',
        apellidos: '',
        edad: '',
        email: '',
        username: '', 
        password: '', 
        confirmPassword: '',
        nivelIngles: '',
        motivaciones: '',
        horasSemanales: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
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

    const mensajesPorMotivacion = {
        'trabajo': '¡Perfecto, mejoraremos tu vocabulario profesional!',
        'viajar': 'Genial, practicarás frases útiles para viajar.',
        'estudios': 'Excelente, te prepararemos para entornos académicos.',
        'interes': 'Muy bien, aprender será divertido y práctico.',
        'otros': 'Entendido, adaptaremos el aprendizaje a tus necesidades.'
    };

    const mensajesPorHoras = {
        '1-2': 'Con 1-2 horas semanales verás progreso gradual.',
        '3-5': 'Muy bien — 3-5 horas es un buen ritmo para avanzar.',
        '6-9': 'Excelente — podrás consolidar y practicar con más frecuencia.',
        '10+': 'Genial, con ese tiempo lograrás avances rápidos.'
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

    const handleEdadChange = (e) => {
        setFormData({ ...formData, edad: e.target.value });
    };

    const handleEmailChange = (e) => {
        setFormData({ ...formData, email: e.target.value });
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

    const handleMotivacionesChange = (e) => {
        const m = e.target.value;
        setFormData({ ...formData, motivaciones: m });
        setMensajeMonstruo(mensajesPorMotivacion[m] || '¿Por qué quieres aprender inglés?');
    };

    const handleHorasChange = (e) => {
        const h = e.target.value;
        setFormData({ ...formData, horasSemanales: h });
        setMensajeMonstruo(mensajesPorHoras[h] || '¿Cuántas horas dedicarías?');
    };

    const handleContinuarNivel = async (e) => {
        e.preventDefault();
        if (!formData.nivelIngles) {
            setError('Por favor selecciona tu nivel de inglés');
            return;
        }
        if (!formData.motivaciones) {
            setError('Por favor selecciona tu motivación para aprender inglés');
            return;
        }
        if (!formData.horasSemanales) {
            setError('Por favor selecciona las horas semanales que dedicarías');
            return;
        }
        
        setLoading(true);
        try {
            const result = await authService.registerStep1({ 
                nivelIngles: formData.nivelIngles,
                motivaciones: formData.motivaciones,
                horasSemanales: formData.horasSemanales
            });
            setUserId(result.userId);
            setError('');
            setMensajeMonstruo('Bien, empecemos registrándote');
            setPaso(2);
        } catch (err) {
            setError(err.message || 'Error al guardar nivel de ingles');
        } finally {
            setLoading(false);
        }
    };

    const handleContinuarNombres = async (e) => {
        e.preventDefault();
        if (!formData.nombres || !formData.apellidos || !formData.edad || !formData.email) {
            setError('Por favor completa todos los campos');
            return;
        }
        if (formData.edad < 1 || formData.edad > 120) {
            setError('Por favor ingresa una edad válida');
            return;
        }

        setLoading(true);
        try {
            await authService.registerStep2(userId, formData.nombres, formData.apellidos, parseInt(formData.edad), formData.email);
            const usuarioGenerado = generarUsuarioRandom(formData.nombres, formData.apellidos);
            setFormData({ ...formData, username: usuarioGenerado });
            setError('');
            setMensajeMonstruo(`Tu usuario será: ${usuarioGenerado}`);
            setPaso(3);
        } catch (err) {
            setError(err.message || 'Error al guardar datos');
        } finally {
            setLoading(false);
        }
    };

    const handleContinuarUsuario = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        try {
            await authService.registerStep3(userId, formData.username);
            const primerNombre = formData.nombres.split(' ')[0];
            setError('');
            setMensajeMonstruo(`Okey ${primerNombre}, para terminar tu registro crea una contraseña`);
            setPaso(4);
        } catch (err) {
            setError(err.message || 'Error al guardar usuario');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

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

        setLoading(true);
        try {
            const result = await authService.registerComplete(userId, formData.password);
            if (result.success) {
                setMostrarCelebracion(true);
            }
        } catch (err) {
            setError(err.message || 'Error al completar registro');
        } finally {
            setLoading(false);
        }
    };

    const handleCelebrationComplete = () => {
        navigate('/login');
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
                    onEdadChange={handleEdadChange}
                    onEmailChange={handleEmailChange}
                    onClaveChange={handleClaveChange}
                    onConfirmClaveChange={handleConfirmClaveChange}
                    onNivelInglesChange={handleNivelInglesChange}
                    onMotivacionesChange={handleMotivacionesChange}
                    onHorasChange={handleHorasChange}
                    onContinuarNivel={handleContinuarNivel}
                    onContinuarNombres={handleContinuarNombres}
                    onContinuarUsuario={handleContinuarUsuario}
                    onSubmit={handleSubmit}
                    onIniciarSesion={handleIniciarSesion}
                    error={error}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Register;

