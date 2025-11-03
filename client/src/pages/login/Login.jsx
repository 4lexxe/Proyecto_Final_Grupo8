import { useState, useEffect } from 'react';
import FormularioLogin from '../../components/FormularioLogin';
import '../../assets/css/login.css';

const Login = () => {
    const [monsterImg, setMonsterImg] = useState('/src/assets/img/idle/1.png');
    const [seguirPunteroMouse, setSeguirPunteroMouse] = useState(true);

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
        const usuario = e.target.value.length;
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
        setSeguirPunteroMouse(false);
        
        // Mostrar celebración
        setMonsterImg('/src/assets/img/celebrar/2.png');

        // Aquí puedes agregar tu lógica de login
        console.log('Login enviado');
        
        // Volver al estado normal después de 2 segundos
        setTimeout(() => {
            setMonsterImg('/src/assets/img/idle/1.png');
            setSeguirPunteroMouse(true);
        }, 2000);
    };

    return (
        <div className="login">
            <img src={monsterImg} id="monster" alt="Monster" />
            <FormularioLogin
                onUsuarioFocus={handleUsuarioFocus}
                onUsuarioBlur={handleUsuarioBlur}
                onUsuarioKeyUp={handleUsuarioKeyUp}
                onClaveFocus={handleClaveFocus}
                onClaveBlur={handleClaveBlur}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default Login;