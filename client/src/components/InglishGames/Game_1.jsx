import { useState, useRef } from "react";
import { FaTimes, FaVolumeUp, FaPalette } from 'react-icons/fa';
import { speakEnglish } from "../../utils/speechUtils";
import { playCorrectSound, playIncorrectSound } from "../../utils/soundUtils";
import "../../assets/css/games.css";

const COLORS = [
    { name: "red", label: "Red", css: "#e53935" },
    { name: "green", label: "Green", css: "#43a047" },
    { name: "blue", label: "Blue", css: "#1e88e5" },
    { name: "yellow", label: "Yellow", css: "#ffc800" },
    { name: "purple", label: "Purple", css: "#8e24aa" },
    { name: "orange", label: "Orange", css: "#ff6600" },
];

function pickOptions(count = 3) {
    const indices = new Set();
    while (indices.size < count) indices.add(Math.floor(Math.random() * COLORS.length));
    return Array.from(indices);
}

function Game_1({ onFinish, addToTotal, totalScore }) {
    const [rounds, setRounds] = useState(0);
    const [levelScore, setLevelScore] = useState(0);
    const [options, setOptions] = useState(() => pickOptions(3));
    const [targetPos, setTargetPos] = useState(() => Math.floor(Math.random() * 3));
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const prevCorrectRef = useRef(null);
    
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

    const handleChoice = async (choicePos) => {
        if (showFeedback) return;

        const correct = choicePos === targetPos;
        const selectedColor = COLORS[options[choicePos]];

        setSelectedOption(choicePos);
        setIsCorrect(correct);
        setShowFeedback(true);
        setIsSpeaking(true);

        if (correct) {
            prevCorrectRef.current = options[targetPos];
            await playCorrectSound();
            await speakEnglish(selectedColor.label);
            setLevelScore(levelScore + 1);
            addToTotal?.(1);
        } else {
            playIncorrectSound();
            addToTotal?.(-1);
            setLevelScore(s => s - 1);
        }

        setIsSpeaking(false);
    };

    const handleContinue = () => {
        if (isSpeaking) return;

        const nextRound = rounds + (isCorrect ? 1 : 0);
        setRounds(nextRound);
        setSelectedOption(null);
        setShowFeedback(false);

        if (nextRound >= 5) {
            onFinish?.(levelScore);
        } else if (isCorrect) {
            nextRoundSetup();
        }
    };

    const handleSpeak = () => speakEnglish(COLORS[options[targetPos]].label);

    return (
        <div className="game-container">
            <main className="game-main">
                <div className="game-content">
                    <div className="game-question-header">
                        <div className="game-icon-box">
                            <FaPalette style={{ color: 'white' }} />
                        </div>
                        <h2 className="game-question-title">
                            Selecciona el color que corresponda a la palabra
                        </h2>
                    </div>

                    <div className="game-word-box">
                        <button onClick={handleSpeak} className="game-speak-btn">
                            <FaVolumeUp size={32} />
                        </button>
                        <h1 className="game-word-text">{COLORS[options[targetPos]].label}</h1>
                    </div>

                    <div className="game-options">
                        {options.map((optIndex, pos) => {
                            const color = COLORS[optIndex];
                            const isSelected = selectedOption === pos;
                            const classes = ["game-option-btn"];
                            
                            if (showFeedback && isSelected) {
                                classes.push(isCorrect ? "game-option-correct" : "game-option-incorrect");
                                if (!isCorrect) classes.push("shake");
                            }

                            return (
                                <button
                                    key={color.name + pos}
                                    onClick={() => handleChoice(pos)}
                                    disabled={showFeedback || isSpeaking}
                                    className={classes.join(" ")}
                                    style={{ backgroundColor: color.css }}
                                >
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
                            disabled={isSpeaking}
                            className={`game-continue-btn ${isCorrect ? 'correct' : 'incorrect'}`}
                            style={{ opacity: isSpeaking ? 0.5 : 1, cursor: isSpeaking ? 'not-allowed' : 'pointer' }}
                        >
                            {isSpeaking ? 'ESPERA...' : 'CONTINUAR'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Game_1;