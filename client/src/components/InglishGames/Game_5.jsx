import { useState, useRef } from "react";
import { FaTimes, FaVolumeUp, FaHandPaper } from 'react-icons/fa';
import { speakEnglish } from "../../utils/speechUtils";
import { playCorrectSound, playIncorrectSound } from "../../utils/soundUtils";
import MonsterCelebration from "./MonsterCelebration";
import "../../assets/css/games.css";

const PARTS = [
    { file: "boca.png", es: "boca", en: "Mouth" },
    { file: "brazo.png", es: "brazo", en: "Arm" },
    { file: "cabeza.png", es: "cabeza", en: "Head" },
    { file: "dedo.png", es: "dedo", en: "Finger" },
    { file: "mano.png", es: "mano", en: "Hand" },
    { file: "nariz.png", es: "nariz", en: "Nose" },
    { file: "ojo.png", es: "ojo", en: "Eye" },
    { file: "oreja.png", es: "oreja", en: "Ear" },
    { file: "pie.png", es: "pie", en: "Foot" },
    { file: "pierna.png", es: "pierna", en: "Leg" },
];

const PARTS_WITH_SRC = PARTS.map((p) => ({ ...p, src: new URL(`../../assets/img/cuerpo/${p.file}`, import.meta.url).href }));

function pickOptions(count = 4) {
    const indices = new Set();
    while (indices.size < count) indices.add(Math.floor(Math.random() * PARTS_WITH_SRC.length));
    return Array.from(indices);
}

function Game_5({ onFinish, addToTotal, totalScore}) {
    const [rounds, setRounds] = useState(0);
    const [levelScore, setLevelScore] = useState(0);
    const [options, setOptions] = useState(() => pickOptions(4));
    const [targetPos, setTargetPos] = useState(() => Math.floor(Math.random() * 4));
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showMonsterCelebration, setShowMonsterCelebration] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const prevCorrectRef = useRef(null);
    
    const nextRoundSetup = () => {
        let newOptions, newTarget;
        const prev = prevCorrectRef.current;
        do {
            newOptions = pickOptions(4);
            newTarget = Math.floor(Math.random() * 4);
        } while (prev != null && newOptions[newTarget] === prev);
        setOptions(newOptions);
        setTargetPos(newTarget);
    };

    const handleChoice = async (choicePos) => {
        if (showFeedback || isProcessing) return;

        setIsProcessing(true);
        const correct = choicePos === targetPos;
        const selectedPart = PARTS_WITH_SRC[options[choicePos]];

        setSelectedOption(choicePos);
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setShowMonsterCelebration(true);
            prevCorrectRef.current = options[targetPos];
            await playCorrectSound();
            await speakEnglish(selectedPart.en);
            setLevelScore(levelScore + 1);
            addToTotal?.(1);
        } else {
            playIncorrectSound();
            addToTotal?.(-1);
            setLevelScore(s => s - 1);
        }

        setIsProcessing(false);
    };

    const handleContinue = () => {
        if (isProcessing) return;

        const nextRound = rounds + (isCorrect ? 1 : 0);
        setRounds(nextRound);
        setSelectedOption(null);
        setShowFeedback(false);
        setShowMonsterCelebration(false);

        if (nextRound >= 5) {
            onFinish?.(levelScore);
        } else if (isCorrect) {
            nextRoundSetup();
        }
    };

    const handleSpeak = () => speakEnglish(PARTS_WITH_SRC[options[targetPos]].en);

    return (
        <div className="game-container">
            {showMonsterCelebration && <MonsterCelebration />}

            <main className="game-main">
                <div className="game-content">
                    <div className="game-question-header">
                        <div className="game-icon-box">
                            <FaHandPaper style={{ color: 'white' }} />
                        </div>
                        <h2 className="game-question-title">
                            Selecciona la parte del cuerpo correcta
                        </h2>
                    </div>

                    <div className="game-word-box">
                        <button onClick={handleSpeak} className="game-speak-btn">
                            <FaVolumeUp size={32} />
                        </button>
                        <h1 className="game-word-text">{PARTS_WITH_SRC[options[targetPos]].en}</h1>
                    </div>

                    <div className="game-options" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        {options.map((optIndex, pos) => {
                            const part = PARTS_WITH_SRC[optIndex];
                            const isSelected = selectedOption === pos;
                            const classes = ["game-option-btn", "game-image-btn"];
                            
                            if (showFeedback && isSelected) {
                                classes.push(isCorrect ? "game-option-correct" : "game-option-incorrect");
                                if (!isCorrect) classes.push("shake");
                            }

                            return (
                                <button
                                    key={part.file + pos}
                                    onClick={() => handleChoice(pos)}
                                    disabled={showFeedback || isProcessing}
                                    className={classes.join(" ")}
                                >
                                    <img src={part.src} alt={part.es} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    {showFeedback && isSelected && (
                                        <div className={`game-option-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                                            {isCorrect ? '✓' : '✗'}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="game-score-footer">
                        NIVEL {rounds}/5 • PUNTOS {totalScore}
                    </div>
                </div>
            </main>

            {showFeedback && (
                <div className={`game-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="game-feedback-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div className={`game-feedback-icon ${isCorrect ? 'correct' : 'incorrect'}`}>
                                {isCorrect ? '✓' : '✗'}
                            </div>
                            <div>
                                <h3 className={`game-feedback-title ${isCorrect ? 'correct' : 'incorrect'}`}>
                                    {isCorrect ? '¡Excelente!' : '¡Respuesta incorrecta!'}
                                </h3>
                            </div>
                        </div>
                        <button 
                            onClick={handleContinue}
                            disabled={isProcessing}
                            className={`game-continue-btn ${isCorrect ? 'correct' : 'incorrect'}`}
                        >
                            CONTINUAR
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Game_5;