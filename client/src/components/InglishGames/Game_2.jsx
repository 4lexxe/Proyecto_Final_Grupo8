import { useState, useEffect, useRef } from "react";
import { FaPaw } from 'react-icons/fa';
import { speakEnglish } from "../../utils/speechUtils";
import { playCorrectSound, playIncorrectSound } from "../../utils/soundUtils";
import MonsterCelebration from "./MonsterCelebration";
import "../../assets/css/games.css";

const ANIMALS = [
    { name: "chicken", label: "Chicken", emoji: "🐓" },
    { name: "dog", label: "Dog", emoji: "🐶" },
    { name: "monkey", label: "Monkey", emoji: "🐒" },
    { name: "cat", label: "Cat", emoji: "🐱" },
    { name: "horse", label: "Horse", emoji: "🐴" },
    { name: "cow", label: "Cow", emoji: "🐮" },
];

const rand = (n) => Math.floor(Math.random() * n);

// pickOptions: elige `count` índices distintos aleatorios del arreglo ANIMALS
function pickOptions(count = 3) {
    const indices = new Set();
    while (indices.size < count) indices.add(rand(ANIMALS.length));
    return Array.from(indices);
}

function Game_2({onFinish, addToTotal, totalScore }) {
    // rounds: número de aciertos correctos completados en este nivel
    const [rounds, setRounds] = useState(0);
    // levelScore: puntuación local de este nivel (puede ser negativa)
    const [levelScore, setLevelScore] = useState(0);
    // options: índices de los animales mostrados en pantalla (3 elementos)
    const [options, setOptions] = useState(() => pickOptions(3));
    // targetPos: posición (0..2) dentro de `options` que es la correcta
    const [targetPos, setTargetPos] = useState(() => Math.floor(Math.random() * 3));
    const [showMonsterCelebration, setShowMonsterCelebration] = useState(false);

    useEffect(() => {
        // initialize level state
        resetLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetLevel = () => {
        setRounds(0);
        setLevelScore(0);
        setOptions(pickOptions(3));
        setTargetPos(rand(3));
    };

    const prevCorrectRef = useRef(null);

    // nextRoundSetup: prepara nuevas opciones y objetivo para la siguiente repetición
    const nextRoundSetup = () => {
        let newOptions, newTarget;
        const prev = prevCorrectRef.current;
        do {
            newOptions = pickOptions(3);
            newTarget = rand(3);
        } while (prev != null && newOptions[newTarget] === prev);
        setOptions(newOptions);
        setTargetPos(newTarget);
    };

    // animated feedback state
    const [animatedPos, setAnimatedPos] = useState(null);
    const [animType, setAnimType] = useState(null);

    // handleChoice: procesar la elección del jugador
    // - correcto: +1, avanzar a la siguiente repetición (o finalizar nivel)
    // - incorrecto: -1 y permanecer en la misma repetición
    const CORRECT_DELAY = 2500;
    const INCORRECT_DELAY = 360;

    const handleChoice = async (choicePos) => {
        const correct = choicePos === targetPos;
        const selectedAnimal = ANIMALS[options[choicePos]];

        if (!correct) {
            setAnimatedPos(choicePos);
            setAnimType("incorrect");
            playIncorrectSound();
            addToTotal?.(-1);
            setLevelScore((s) => s - 1);
            setTimeout(() => {
                setAnimatedPos(null);
                setAnimType(null);
            }, INCORRECT_DELAY);
            return;
        }

        // correct path
        setAnimatedPos(choicePos);
        setAnimType("correct");
        setShowMonsterCelebration(true);
        prevCorrectRef.current = options[targetPos];

        await playCorrectSound();
        await speakEnglish(selectedAnimal.label);

        const updatedLevelScore = levelScore + 1;
        setTimeout(() => {
            setLevelScore(updatedLevelScore);
            addToTotal?.(1);
            const nextRound = rounds + 1;
            setRounds(nextRound);
            setAnimatedPos(null);
            setAnimType(null);
            setShowMonsterCelebration(false);
            if (nextRound >= 5) return onFinish(updatedLevelScore);
            nextRoundSetup();
        }, CORRECT_DELAY);
    };

    const percent = Math.round((rounds / 5) * 100);

    return (
        <div className="ig-card" style={{ position: 'relative' }}>
            {showMonsterCelebration && <MonsterCelebration />}
            
            <div className="ig-header">
                <h3 className="ig-title">
                    <FaPaw style={{ marginRight: '12px', color: '#ff6b9d' }} />
                    Animals — Match the word
                </h3>
                <div className="ig-subtitle">Selecciona el animal que corresponde al nombre mostrado</div>
                
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
                    <div className="ig-question-text">{ANIMALS[options[targetPos]].label}</div>
                </div>
            </div>

            <div className="ig-options ig-options-grid">
                {options.map((optIndex, pos) => {
                    const a = ANIMALS[optIndex];
                    const classes = ["ig-btn", "ig-emoji-btn"];
                    if (animatedPos === pos) {
                        if (animType === "incorrect") classes.push("shake", "ig-incorrect");
                        else if (animType === "correct") classes.push("ig-correct");
                    }
                    return (
                        <button
                            key={a.name + pos}
                            onClick={() => handleChoice(pos)}
                            aria-label={a.label}
                            className={classes.join(" ")}
                        >
                            <span className="emoji-large">{a.emoji}</span>
                        </button>
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

export default Game_2;