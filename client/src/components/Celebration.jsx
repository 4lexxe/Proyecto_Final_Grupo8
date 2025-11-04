import { useEffect } from 'react';
import '../assets/css/celebration.css';

const Celebration = ({ onComplete }) => {
    useEffect(() => {
        // Reproducir sonido
        const audio = new Audio('/src/assets/sounds/sonido_registro_exitoso.mp3');
        audio.play().catch(error => console.log('Error al reproducir sonido:', error));

        // Redirigir después de 3 segundos
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

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
                    src="/src/assets/img/celebrar/2.png" 
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

