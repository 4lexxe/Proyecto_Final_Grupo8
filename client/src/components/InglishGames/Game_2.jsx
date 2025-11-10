import { useState, useRef } from "react";
import { FaTimes, FaVolumeUp, FaPaw } from 'react-icons/fa';
import { speakEnglish } from "../../utils/speechUtils";
import { playCorrectSound, playIncorrectSound } from "../../utils/soundUtils";
import "../../assets/css/games.css";

const ANIMALS = [
    { name: "chicken", label: "Chicken", emoji: "🐓" },
    { name: "dog", label: "Dog", emoji: "🐶" },
    { name: "monkey", label: "Monkey", emoji: "🐒" },
    { name: "cat", label: "Cat", emoji: "🐱" },
    { name: "horse", label: "Horse", emoji: "🐴" },
    { name: "cow", label: "Cow", emoji: "🐮" },
];

function pickOptions(count = 3) {
    const indices = new Set();
    while (indices.size < count) indices.add(Math.floor(Math.random() * ANIMALS.length));
    return Array.from(indices);
}

function Game_2({ onFinish, addToTotal, totalScore}) {
    const [rounds, setRounds] = useState(0);
    const [levelScore, setLevelScore] = useState(0);
    const [options, setOptions] = useState(() => pickOptions(3));
    const [targetPos, setTargetPos] = useState(() => Math.floor(Math.random() * 3));
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
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
        const selectedAnimal = ANIMALS[options[choicePos]];

        setSelectedOption(choicePos);
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            prevCorrectRef.current = options[targetPos];
            await playCorrectSound();
            await speakEnglish(selectedAnimal.label);
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

    const handleSpeak = () => speakEnglish(ANIMALS[options[targetPos]].label);

    return (
        <div className="game-container">
            <main className="game-main">
                <div className="game-content">
                    <div className="game-question-header">
                        <div className="game-icon-box">
                            <FaPaw style={{ color: 'white' }} />
                        </div>
                        <h2 className="game-question-title">
                            Selecciona el animal que corresponde al nombre
                        </h2>
                    </div>

                    <div className="game-word-box">
                        <button onClick={handleSpeak} className="game-speak-btn">
                            <FaVolumeUp size={32} />
                        </button>
                        <h1 className="game-word-text">{ANIMALS[options[targetPos]].label}</h1>
                    </div>

                    <div className="game-options">
                        {options.map((optIndex, pos) => {
                            const animal = ANIMALS[optIndex];
                            const isSelected = selectedOption === pos;
                            const classes = ["game-option-btn", "game-emoji-btn"];
                            
                            if (showFeedback && isSelected) {
                                classes.push(isCorrect ? "game-option-correct" : "game-option-incorrect");
                                if (!isCorrect) classes.push("shake");
                            }

                            return (
                                <button
                                    key={animal.name + pos}
                                    onClick={() => handleChoice(pos)}
                                    disabled={showFeedback}
                                    className={classes.join(" ")}
                                >
                                    <span className="emoji-large">{animal.emoji}</span>
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

export default Game_2;