import { useEffect, useState, useRef } from 'react';
import '../assets/css/celebration.css';
import sonidoExitoUrl from '../assets/sounds/sonido_registro_exitoso.mp3?url';

const Celebration = ({ onComplete }) => {
    const [frameActual, setFrameActual] = useState(0);
    const audioRef = useRef(null);
    const totalFrames = 62;
    const tiempoPorFrame = 80; // 80ms por frame (más lento y suave)
    const tiempoTotalAnimacion = totalFrames * tiempoPorFrame; // ~4960ms (casi 5 segundos)

    useEffect(() => {
        // Crear y reproducir sonido usando la URL importada
        const audio = new Audio(sonidoExitoUrl);
        audioRef.current = audio;
        
        // Configurar audio antes de reproducir
        audio.volume = 0.5;
        
        // Reproducir después de un pequeño delay para evitar problemas
        const audioTimer = setTimeout(() => {
            audio.play().catch(error => console.log('Error al reproducir sonido:', error));
        }, 100);

        let frameCount = 0;

        // Animar frames del monstruo
        const frameInterval = setInterval(() => {
            frameCount++;
            if (frameCount < totalFrames) {
                setFrameActual(frameCount);
            } else {
                // Mantener el último frame
                clearInterval(frameInterval);
            }
        }, tiempoPorFrame);

        // Redirigir después de que termine la animación + 500ms extra
        const timer = setTimeout(() => {
            onComplete();
        }, tiempoTotalAnimacion + 500);

        return () => {
            clearInterval(frameInterval);
            clearTimeout(timer);
            clearTimeout(audioTimer);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [onComplete, totalFrames, tiempoPorFrame, tiempoTotalAnimacion]);

    // Generar el nombre del archivo con padding
    const getFramePath = (frameNumber) => {
        const paddedNumber = String(frameNumber).padStart(2, '0');
        return `/src/assets/img/monster_frames/sprite_monster${paddedNumber}.png`;
    };

    // Generar confeti
    const confetti = Array.from({ length: 50 }, (_, i) => (
        <div
            key={i}
            className="confetti"
            style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe'][Math.floor(Math.random() * 6)]
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
                <h2 className="celebration-text">¡Registro exitoso!</h2>
            </div>
            <div className="confetti-container">
                {confetti}
            </div>
        </div>
    );
};

export default Celebration;
