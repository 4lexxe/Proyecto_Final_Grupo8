import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutorizacion } from '../../hooks/useAutorizacion';
import FormularioLogin from '../../components/FormularioLogin';
import '../../assets/css/login.css';

const Login = () => {
    const [monsterImg, setMonsterImg] = useState('/src/assets/img/idle/1.png');
    const [seguirPunteroMouse, setSeguirPunteroMouse] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    
    const { login } = useAutorizacion();
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (m) => {
            if (seguirPunteroMouse) {
                const anchoMitad = window.innerWidth / 2;
                const altoMitad = window.innerHeight / 2;

                if (m.clientX < anchoMitad && m.clientY < altoMitad) {
                    setMonsterImg('/src/assets/img/idle/2.png');
                } else if (m.clientX < anchoMitad && m.clientY > altoMitad) {
                    setMonsterImg('/src/assets/img/idle/3.png');
                } else if (m.clientX > anchoMitad && m.clientY < altoMitad) {
                    setMonsterImg('/src/assets/img/idle/5.png');
                } else {
                    setMonsterImg('/src/assets/img/idle/4.png');
                }
            }
        };

        document.body.addEventListener('mousemove', handleMouseMove);
        return () => document.body.removeEventListener('mousemove', handleMouseMove);
    }, [seguirPunteroMouse]);

    const handleUsuarioFocus = () => {
        setSeguirPunteroMouse(false);
    };

    const handleUsuarioBlur = () => {
        setSeguirPunteroMouse(true);
    };

    const handleUsuarioKeyUp = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, username: value });
        
        const usuario = value.length;
        if (usuario >= 0 && usuario <= 5) {
            setMonsterImg('/src/assets/img/read/1.png');
        } else if (usuario >= 6 && usuario <= 14) {
            setMonsterImg('/src/assets/img/read/2.png');
        } else if (usuario >= 15 && usuario <= 20) {
            setMonsterImg('/src/assets/img/read/3.png');
        } else {
            setMonsterImg('/src/assets/img/read/4.png');
        }
    };

    const handleClaveChange = (e) => {
        setFormData({ ...formData, password: e.target.value });
    };

    const handleClaveFocus = () => {
        setSeguirPunteroMouse(false);
        let cont = 1;
        const cubrirOjo = setInterval(() => {
            setMonsterImg(`/src/assets/img/cover/${cont}.png`);
            if (cont < 8) {
                cont++;
            } else {
                clearInterval(cubrirOjo);
            }
        }, 60);
    };

    const handleClaveBlur = () => {
        setSeguirPunteroMouse(true);
        let cont = 7;
        const descubrirOjo = setInterval(() => {
            setMonsterImg(`/src/assets/img/cover/${cont}.png`);
            if (cont > 1) {
                cont--;
            } else {
                clearInterval(descubrirOjo);
            }
        }, 60);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSeguirPunteroMouse(false);
        
        // Intentar login
        const result = login(formData);
        
        if (result.success) {
            // Mostrar celebración
            setMonsterImg('/src/assets/img/celebrar/2.png');
            
            // Redirigir al home después de la celebración
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            // Mostrar error
            setError(result.message || 'Credenciales inválidas');
            setMonsterImg('/src/assets/img/idle/1.png');
            setSeguirPunteroMouse(true);
        }
    };

    const handleRegistrarse = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <div className="login-page">
            <div className="login">
                <img src={monsterImg} id="monster" alt="Monster" />
                <FormularioLogin
                    onUsuarioFocus={handleUsuarioFocus}
                    onUsuarioBlur={handleUsuarioBlur}
                    onUsuarioKeyUp={handleUsuarioKeyUp}
                    onClaveFocus={handleClaveFocus}
                    onClaveBlur={handleClaveBlur}
                    onClaveChange={handleClaveChange}
                    onSubmit={handleSubmit}
                    onRegistrarse={handleRegistrarse}
                    error={error}
                />
            </div>
        </div>
    );
};

export default Login;