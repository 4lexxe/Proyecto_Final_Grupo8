import { useState, useEffect, useRef } from "react";
import { FaSortNumericDown } from 'react-icons/fa';
import { speakEnglish } from "../../utils/speechUtils";
import { playCorrectSound, playIncorrectSound } from "../../utils/soundUtils";
import MonsterCelebration from "./MonsterCelebration";
import "../../assets/css/games.css";

const NUMBERS = [
    { value: 1, label: "One" },
    { value: 2, label: "Two" },
    { value: 3, label: "Three" },
    { value: 4, label: "Four" },
    { value: 5, label: "Five" },
    { value: 6, label: "Six" },
    { value: 7, label: "Seven" },
    { value: 8, label: "Eight" },
    { value: 9, label: "Nine" },
    { value: 10, label: "Ten" },
];

const rand = (n) => Math.floor(Math.random() * n);

// pickOptions: selecciona `count` índices distintos de NUMBERS aleatoriamente
function pickOptions(count = 4) {
    const indices = new Set();
    while (indices.size < count) indices.add(rand(NUMBERS.length));
    return Array.from(indices);
}

function Game_3({onFinish, addToTotal, totalScore }) {
    // rounds: aciertos correctos completados en este nivel
    const [rounds, setRounds] = useState(0);
    // levelScore: puntuación local del nivel
    const [levelScore, setLevelScore] = useState(0);
    // options: índices de NUMBERS mostrados (4 opciones)
    const [options, setOptions] = useState(() => pickOptions(4));
    // targetPos: posición (0..3) de la opción correcta dentro de `options`
    const [targetPos, setTargetPos] = useState(() => Math.floor(Math.random() * 4));
    const [showMonsterCelebration, setShowMonsterCelebration] = useState(false);

    useEffect(() => {
        resetLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetLevel = () => {
        setRounds(0);
        setLevelScore(0);
        setOptions(pickOptions(4));
        setTargetPos(rand(4));
    };

    const prevCorrectRef = useRef(null);

    // nextRoundSetup: prepara nuevas opciones y objetivo para la siguiente repetición
    const nextRoundSetup = () => {
        let newOptions, newTarget;
        const prev = prevCorrectRef.current;
        do {
            newOptions = pickOptions(4);
            newTarget = rand(4);
        } while (prev != null && newOptions[newTarget] === prev);
        setOptions(newOptions);
        setTargetPos(newTarget);
    };

    // animated feedback state
    const [animatedPos, setAnimatedPos] = useState(null);
    const [animType, setAnimType] = useState(null);

    const CORRECT_DELAY = 2500;
    const INCORRECT_DELAY = 360;

    const handleChoice = async (choicePos) => {
        const correct = choicePos === targetPos;
        const selectedNumber = NUMBERS[options[choicePos]];

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

        setAnimatedPos(choicePos);
        setAnimType("correct");
        setShowMonsterCelebration(true);
        prevCorrectRef.current = options[targetPos];

        await playCorrectSound();
        await speakEnglish(selectedNumber.label);

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
                    <FaSortNumericDown style={{ marginRight: '12px', color: '#ff6b9d' }} />
                    Numbers — Words and Digits
                </h3>
                <div className="ig-subtitle">Selecciona la palabra que corresponde al número mostrado</div>
                
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
                    <div className="ig-question-number">{NUMBERS[options[targetPos]].value}</div>
                </div>
            </div>

            <div className="ig-options">
                {options.map((optIndex, pos) => {
                    const n = NUMBERS[optIndex];
                    const classes = ["ig-btn", "ig-number-btn"];
                    if (animatedPos === pos) {
                        if (animType === "incorrect") classes.push("shake", "ig-incorrect");
                        else if (animType === "correct") classes.push("ig-correct");
                    }
                    return (
                        <button
                            key={n.value + "-" + pos}
                            onClick={() => handleChoice(pos)}
                            aria-label={n.label}
                            className={classes.join(" ")}
                        >
                            {n.label}
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

export default Game_3;