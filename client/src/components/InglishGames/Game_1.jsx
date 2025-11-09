import { useState, useEffect } from "react";
import { FaPalette } from 'react-icons/fa';
import { speakEnglish } from "../../utils/speechUtils";
import { playCorrectSound, playIncorrectSound } from "../../utils/soundUtils";
import MonsterCelebration from "./MonsterCelebration";
import "../../assets/css/games.css";
import { useRef } from "react";

const COLORS = [
    { name: "red", label: "Red", css: "#e53935" },
    { name: "green", label: "Green", css: "#43a047" },
    { name: "blue", label: "Blue", css: "#1e88e5" },
    { name: "yellow", label: "Yellow", css: "#fcce03ff" },
    { name: "purple", label: "Purple", css: "#8e24aa" },
    { name: "orange", label: "Orange", css: "#fb6400ff" },
];

// pickOptions: selecciona `count` índices distintos aleatorios del arreglo COLORS
function pickOptions(count = 3) {
    const indices = new Set();
    while (indices.size < count) {
        indices.add(Math.floor(Math.random() * COLORS.length));
    }
    return Array.from(indices);
}

function Game_1({ onFinish, addToTotal, totalScore }) {
    // número de aciertos completados en este nivel (hasta 5)
    const [rounds, setRounds] = useState(0);
    // puntuación local del nivel (puede ser negativa)
    const [levelScore, setLevelScore] = useState(0);
    // índices de las 3 opciones actuales (referencias a COLORS)
    const [options, setOptions] = useState(() => pickOptions(3));
    // índice dentro de `options` que es el objetivo (0..options.length-1)
    const [targetPos, setTargetPos] = useState(() => Math.floor(Math.random() * 3));
    // animated feedback state: position being animated and type ('correct'|'incorrect')
    const [animatedPos, setAnimatedPos] = useState(null);
    const [animType, setAnimType] = useState(null);
    const [showMonsterCelebration, setShowMonsterCelebration] = useState(false);

    // reiniciar estado al montar
    useEffect(() => {
        setRounds(0);
        setLevelScore(0);
        setOptions(pickOptions(3));
        setTargetPos(Math.floor(Math.random() * 3));
    }, []);

    const prevCorrectRef = useRef(null);
    
    // nextRoundSetup: prepara nuevas opciones y objetivo para la siguiente repetición
    const nextRoundSetup = () => {
        let newOptions, newTarget;
        const prev = prevCorrectRef.current;
        do {
            newOptions = pickOptions(3);
            newTarget = Math.floor(Math.random() * 3);
        } while (prev != null && newOptions[newTarget] === prev);
        setOptions(newOptions);
        setTargetPos(newTarget);
    };

    // handleChoice: procesar la selección del usuario
    // - si es correcta: sumar punto, avanzar ronda (o finalizar nivel)
    // - si es incorrecta: restar punto global y permanecer en la misma repetición
    const handleChoice = async (choicePos) => {
        const correct = choicePos === targetPos;
        const selectedColor = COLORS[options[choicePos]];

        setAnimatedPos(choicePos);
        setAnimType(correct ? "correct" : "incorrect");

        if (correct) {
            // Mostrar celebración del monstruo
            setShowMonsterCelebration(true);
            
            await playCorrectSound();
            await speakEnglish(selectedColor.label);
            // Guardar el índice correcto actual para evitar repetirlo en la siguiente ronda
            prevCorrectRef.current = options[targetPos];

            const updatedLevelScore = levelScore + 1;
            setLevelScore(updatedLevelScore);
            addToTotal && addToTotal(1);
            const nextRound = rounds + 1;
            setRounds(nextRound);

            // Reducir tiempo de espera
            setTimeout(() => {
                setAnimatedPos(null);
                setAnimType(null);
                setShowMonsterCelebration(false);
                if (nextRound >= 5) {
                    onFinish && onFinish(updatedLevelScore);
                } else {
                    nextRoundSetup();
                }
            }, 2500); // Reducido de 3100 a 2500
        } else {
            playIncorrectSound();
            addToTotal && addToTotal(-1);
            setLevelScore((s) => s - 1);

            setTimeout(() => {
                setAnimatedPos(null);
                setAnimType(null);
            }, 400);
        }
    };

    const percent = Math.round((rounds / 5) * 100);

    return (
        <div className="ig-card" style={{ position: 'relative' }}>
            {showMonsterCelebration && <MonsterCelebration />}
            
            <div className="ig-header">
                <h3 className="ig-title">
                    <FaPalette style={{ marginRight: '12px', color: '#ff6b9d' }} />
                    Colors — Match the word
                </h3>
                <div className="ig-subtitle">Selecciona el color que corresponda a la palabra</div>
                
                <div className="ig-stats">
                    <div className="ig-stat">
                        <span className="label">Nivel</span>
                        <span className="value">{rounds}/5</span>
                    </div>
                    <div className="ig-stat">
                        <span className="label">Puntos</span>
                        <span className="value">{levelScore}</span>
                    </div>
                    {typeof totalScore !== "undefined" && (
                        <div className="ig-stat">
                            <span className="label">Total</span>
                            <span className="value">{totalScore}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="ig-question-area">
                <div className="ig-question-box">
                    <div className="ig-question-text">{COLORS[options[targetPos]].label}</div>
                </div>
            </div>

            <div className="ig-options ig-options-grid">
                {options.map((optIndex, pos) => {
                    const c = COLORS[optIndex];
                    const classes = ["ig-btn", "ig-color-btn"];
                    if (animatedPos === pos) {
                        if (animType === "incorrect") classes.push("shake", "ig-incorrect");
                        else if (animType === "correct") classes.push("ig-correct");
                    }
                    return (
                        <button
                            key={c.name + pos}
                            onClick={() => handleChoice(pos)}
                            aria-label={c.label}
                            className={classes.join(" ")}
                            style={{
                                background: c.css,
                                borderColor: c.css,
                            }}
                        />
                    );
                })}
            </div>

            <div className="ig-progress-container">
                <div className="ig-progress">
                    <span style={{ width: `${percent}%` }} />
                </div>
                <div style={{ marginTop: 12, textAlign: "center", color: "#999", fontSize: 14, fontWeight: 600 }}>
                    {percent}% completado
                </div>
            </div>
        </div>
    );
}

export default Game_1;