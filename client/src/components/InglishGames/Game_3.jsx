import { useState, useRef } from "react";
import { FaTimes, FaVolumeUp, FaSortNumericUp } from 'react-icons/fa';
import { speakEnglish } from "../../utils/speechUtils";
import { playCorrectSound, playIncorrectSound } from "../../utils/soundUtils";
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

function pickOptions(count = 4) {
    const indices = new Set();
    while (indices.size < count) indices.add(Math.floor(Math.random() * NUMBERS.length));
    return Array.from(indices);
}

function Game_3({ onFinish, addToTotal, totalScore}) {
    const [rounds, setRounds] = useState(0);
    const [levelScore, setLevelScore] = useState(0);
    const [options, setOptions] = useState(() => pickOptions(4));
    const [targetPos, setTargetPos] = useState(() => Math.floor(Math.random() * 4));
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
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
        if (showFeedback) return;

        const correct = choicePos === targetPos;
        const selectedNumber = NUMBERS[options[choicePos]];

        setSelectedOption(choicePos);
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            prevCorrectRef.current = options[targetPos];
            await playCorrectSound();
            await speakEnglish(selectedNumber.label);
            setLevelScore(levelScore + 1);
            addToTotal?.(1);
        } else {
            playIncorrectSound();
            addToTotal?.(-1);
            setLevelScore(s => s - 1);
        }
    };

    const handleContinue = () => {
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

    const handleSpeak = () => speakEnglish(NUMBERS[options[targetPos]].label);

    return (
        <div className="game-container">
            <main className="game-main">
                <div className="game-content">
                    <div className="game-question-header">
                        <div className="game-icon-box">
                            <FaSortNumericUp style={{ color: 'white' }} />
                        </div>
                        <h2 className="game-question-title">
                            Selecciona la palabra que corresponde al número
                        </h2>
                    </div>

                    <div className="game-word-box">
                        <button onClick={handleSpeak} className="game-speak-btn">
                            <FaVolumeUp size={32} />
                        </button>
                        <h1 className="game-word-text" style={{ fontSize: '64px' }}>{NUMBERS[options[targetPos]].value}</h1>
                    </div>

                    <div className="game-options" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        {options.map((optIndex, pos) => {
                            const number = NUMBERS[optIndex];
                            const isSelected = selectedOption === pos;
                            const classes = ["game-option-btn", "game-number-btn"];
                            
                            if (showFeedback && isSelected) {
                                classes.push(isCorrect ? "game-option-correct" : "game-option-incorrect");
                                if (!isCorrect) classes.push("shake");
                            }

                            return (
                                <button
                                    key={number.value + pos}
                                    onClick={() => handleChoice(pos)}
                                    disabled={showFeedback}
                                    className={classes.join(" ")}
                                >
                                    {number.label}
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

export default Game_3;