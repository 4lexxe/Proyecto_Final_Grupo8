import { useState, useEffect } from "react";
import { speakEnglish } from "../../utils/speechUtils";
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

// pickOptions: selecciona `count` índices distintos de NUMBERS aleatoriamente
function pickOptions(count = 4) {
    const indices = new Set();
    while (indices.size < count) {
        indices.add(Math.floor(Math.random() * NUMBERS.length));
    }
    return Array.from(indices);
}

function Game_3({ title, onFinish, addToTotal, totalScore }) {
    // rounds: aciertos correctos completados en este nivel
    const [rounds, setRounds] = useState(0);
    // levelScore: puntuación local del nivel
    const [levelScore, setLevelScore] = useState(0);
    // options: índices de NUMBERS mostrados (4 opciones)
    const [options, setOptions] = useState(() => pickOptions(4));
    // targetPos: posición (0..3) de la opción correcta dentro de `options`
    const [targetPos, setTargetPos] = useState(() => Math.floor(Math.random() * 4));

    useEffect(() => {
        setRounds(0);
        setLevelScore(0);
        setOptions(pickOptions(4));
        setTargetPos(Math.floor(Math.random() * 4));
    }, []);

    // nextRoundSetup: prepara nuevas opciones y objetivo para la siguiente repetición
    // nextRoundSetup: prepara nuevas opciones y objetivo
    const nextRoundSetup = () => {
        const newOptions = pickOptions(4);
        setOptions(newOptions);
        setTargetPos(Math.floor(Math.random() * 4));
    };

    // animated feedback state
    const [animatedPos, setAnimatedPos] = useState(null);
    const [animType, setAnimType] = useState(null);

    // handleChoice: maneja la elección del jugador (correcta/incorrecta)
    const handleChoice = (choicePos) => {
        const correct = choicePos === targetPos;
        const selectedNumber = NUMBERS[options[choicePos]];
        
        if (correct) {
            setAnimatedPos(choicePos);
            setAnimType("correct");
            
            // Pronunciar el número en inglés
            speakEnglish(selectedNumber.label);
            
            const updatedLevelScore = levelScore + 1;
            setTimeout(() => {
                setLevelScore(updatedLevelScore);
                addToTotal && addToTotal(1);
                const nextRound = rounds + 1;
                setRounds(nextRound);
                setAnimatedPos(null);
                setAnimType(null);
                if (nextRound >= 5) {
                    onFinish(updatedLevelScore);
                    return;
                }
                nextRoundSetup();
            }, 360);
        } else {
            setAnimatedPos(choicePos);
            setAnimType("incorrect");
            addToTotal && addToTotal(-1);
            setLevelScore((s) => s - 1);
            setTimeout(() => {
                setAnimatedPos(null);
                setAnimType(null);
            }, 360);
        }
    };

    const percent = Math.round((rounds / 5) * 100);

    return (
        <div className="ig-card">
            <div className="ig-header">
                <div>
                    <h3 className="ig-title">{title || "Numbers — Words and Digits"}</h3>
                    <div className="ig-subtitle">Selecciona la palabra que corresponde al número mostrado. 5 aciertos para completar el nivel.</div>
                </div>

                <div className="ig-stats">
                    <div className="ig-stat">
                        <span className="label">Nivel</span>
                        <span className="value">{rounds} / 5</span>
                    </div>
                    <div className="ig-stat">
                        <span className="label">Puntos (nivel)</span>
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

            <div style={{ display: "flex", gap: 12, justifyContent: "center", margin: "16px 0" }}>
                {options.map((optIndex, pos) => {
                    const n = NUMBERS[optIndex];
                    const classes = ["ig-btn"];
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
                            style={{
                                minWidth: 100,
                                height: 80,
                                background: "white",
                                border: "2px solid #ddd",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontSize: 20,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 8,
                            }}
                        >
                            {n.label}
                        </button>
                    );
                })}
            </div>

            <div style={{ marginTop: 8, textAlign: "center" }}>
                <div style={{ display: "inline-block", padding: 24, border: "2px dashed #ccc", borderRadius: 8, minWidth: 120 }}>
                    <div style={{ fontSize: 28, fontWeight: 700 }}>{NUMBERS[options[targetPos]].value}</div>
                </div>

                <div style={{ maxWidth: 420, margin: "12px auto 0" }}>
                    <div className="ig-progress" aria-hidden="true">
                        <span style={{ width: `${percent}%` }} />
                    </div>
                    <div style={{ marginTop: 8, textAlign: "center", color: "#53646f", fontSize: 13 }}>
                        Progreso: {rounds} / 5 — {percent}% completado
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game_3;