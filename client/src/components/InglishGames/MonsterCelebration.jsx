import { useEffect, useState } from 'react';

const MonsterCelebration = ({ onComplete }) => {
    const [frameActual, setFrameActual] = useState(0);
    const totalFrames = 62;
    const tiempoPorFrame = 50; // 50ms por frame (más rápido para el juego)

    useEffect(() => {
        let frameCount = 0;

        const frameInterval = setInterval(() => {
            frameCount++;
            if (frameCount < totalFrames) {
                setFrameActual(frameCount);
            } else {
                clearInterval(frameInterval);
                if (onComplete) {
                    onComplete();
                }
            }
        }, tiempoPorFrame);

        return () => {
            clearInterval(frameInterval);
        };
    }, [onComplete]);

    const getFramePath = (frameNumber) => {
        const paddedNumber = String(frameNumber).padStart(2, '0');
        return `/src/assets/img/monster_frames/sprite_monster${paddedNumber}.png`;
    };

    return (
        <div style={{
            position: 'absolute',
            top: '25%',
            right: '-90px',
            zIndex: 1000,
            pointerEvents: 'none'
        }}>
            <img 
                src={getFramePath(frameActual)}
                alt="Celebración" 
                style={{
                    width: '390px',
                    height: 'auto',
                    filter: 'drop-shadow(0 0 20px rgba(255, 94, 0, 0.6))'
                }}
            />
        </div>
    );
};

export default MonsterCelebration;
