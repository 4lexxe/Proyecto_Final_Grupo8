import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/celebration.css';

const GameCompletionScreen = ({ totalScore, onComplete }) => {
    const [frameActual, setFrameActual] = useState(0);
    const audioRef = useRef(null);
    const totalFrames = 62;
    const tiempoPorFrame = 80;
    const tiempoTotalAnimacion = totalFrames * tiempoPorFrame;
    const navigate = useNavigate();

    useEffect(() => {
        // Usar URL directa sin importación
        const audio = new Audio('/src/assets/sounds/sonido_registro_exitoso.mp3');
        audioRef.current = audio;
        audio.volume = 0.5;

        const audioTimer = setTimeout(() => {
            audio.play().catch(error => console.log('Error al reproducir sonido:', error));
        }, 100);

        let frameCount = 0;
        const frameInterval = setInterval(() => {
            frameCount++;
            if (frameCount < totalFrames) {
                setFrameActual(frameCount);
            } else {
                clearInterval(frameInterval);
            }
        }, tiempoPorFrame);

        const timer = setTimeout(() => {
            onComplete && onComplete();
        }, tiempoTotalAnimacion + 2000);

        return () => {
            clearInterval(frameInterval);
            clearTimeout(timer);
            clearTimeout(audioTimer);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [onComplete]);

    const getFramePath = (frameNumber) => {
        const paddedNumber = String(frameNumber).padStart(2, '0');
        return `/src/assets/img/monster_frames/sprite_monster${paddedNumber}.png`;
    };

    const getScoreMessage = () => {
        if (totalScore >= 20) return "¡Excelente trabajo! 🌟";
        if (totalScore >= 15) return "¡Muy bien hecho! 👏";
        if (totalScore >= 10) return "¡Buen trabajo! 👍";
        return "¡Sigue practicando! 💪";
    };

    const getScoreColor = () => {
        if (totalScore >= 20) return "#FFD700";
        if (totalScore >= 15) return "#4ecdc4";
        if (totalScore >= 10) return "#45b7d1";
        return "#8f4790";
    };

    const confetti = Array.from({ length: 50 }, (_, i) => (
        <div
            key={i}
            className="confetti"
            style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#8f4790', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe'][Math.floor(Math.random() * 6)]
            }}
        />
    ));

    return (
        <div className="celebration-overlay">
            <div className="celebration-content">
                <img
                    src={getFramePath(frameActual)}
                    alt="Celebración"
                    className="celebration-monster"
                />
                <h2 className="celebration-text" style={{ fontSize: '48px', marginBottom: '20px' }}>
                    ¡Juegos Completados!
                </h2>
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '30px 50px',
                    boxShadow: '0 8px 32px rgba(143, 71, 144, 0.3)',
                    border: '3px solid #8f4790',
                    marginTop: '20px'
                }}>
                    <h3 style={{
                        color: getScoreColor(),
                        fontSize: '36px',
                        margin: '10px 0',
                        textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        {getScoreMessage()}
                    </h3>
                    <div style={{
                        fontSize: '72px',
                        fontWeight: '900',
                        color: '#8f4790',
                        margin: '20px 0',
                        textShadow: '0 4px 15px rgba(143, 71, 144, 0.3)'
                    }}>
                        {totalScore} puntos
                    </div>
                    <p style={{
                        color: '#666',
                        fontSize: '18px',
                        margin: '10px 0 0 0'
                    }}>
                        Has completado los 5 minijuegos
                    </p>
                    {/* Botones de acción: permitir navegar o reiniciar */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '18px' }}>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                background: '#8f4790',
                                color: 'white',
                                padding: '10px 18px',
                                borderRadius: '10px',
                                border: 'none',
                                fontWeight: 700,
                                cursor: 'pointer'
                            }}
                        >
                            Ir al menú
                        </button>
                    </div>
                </div>
            </div>
            <div className="confetti-container">
                {confetti}
            </div>
        </div>
    );
};

export default GameCompletionScreen;
