import { useState, useRef } from "react";
import { FaPalette } from 'react-icons/fa';
import { speakEnglish } from "../../utils/speechUtils";
import { playCorrectSound, playIncorrectSound } from "../../utils/soundUtils";
import MonsterCelebration from "./MonsterCelebration";
import "../../assets/css/games.css";

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
    while (indices.size < count) indices.add(Math.floor(Math.random() * COLORS.length));
    return Array.from(indices);
}

const randIndex = (n) => Math.floor(Math.random() * n);

function Game_1({ onFinish, addToTotal, totalScore }) {
    const [rounds, setRounds] = useState(0);
    const [levelScore, setLevelScore] = useState(0);
    const [options, setOptions] = useState(() => pickOptions(3));
    const [targetPos, setTargetPos] = useState(() => randIndex(3));
    const [animatedPos, setAnimatedPos] = useState(null);
    const [animType, setAnimType] = useState(null);
    const [showMonsterCelebration, setShowMonsterCelebration] = useState(false);

    const prevCorrectRef = useRef(null);

    // selecciona nuevas opciones/objetivo asegurando que el elemento correcto cambie
    const nextRoundSetup = () => {
        const prev = prevCorrectRef.current;
        let newOptions, newTarget;
        do {
            newOptions = pickOptions(3);
            newTarget = randIndex(3);
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
        setAnimType(correct ? 'correct' : 'incorrect');

        if (!correct) {
            playIncorrectSound();
            addToTotal && addToTotal(-1);
            setLevelScore((s) => s - 1);
            setTimeout(() => { setAnimatedPos(null); setAnimType(null); }, 400);
            return;
        }

        setShowMonsterCelebration(true);
        prevCorrectRef.current = options[targetPos];
        await playCorrectSound();
        await speakEnglish(selectedColor.label);

        const updatedLevelScore = levelScore + 1;
        setLevelScore(updatedLevelScore);
        addToTotal && addToTotal(1);
        const nextRound = rounds + 1;
        setRounds(nextRound);

        setTimeout(() => {
            setAnimatedPos(null);
            setAnimType(null);
            setShowMonsterCelebration(false);
            if (nextRound >= 5) onFinish && onFinish(updatedLevelScore);
            else nextRoundSetup();
        }, 2500);
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