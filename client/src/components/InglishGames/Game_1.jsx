import { useState, useEffect } from "react";
import { speakEnglish } from "../../utils/speechUtils";
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
    while (indices.size < count) {
        indices.add(Math.floor(Math.random() * COLORS.length));
    }
    return Array.from(indices);
}

function Game_1({ title, onFinish, addToTotal, totalScore }) {
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

    // reiniciar estado al montar
    useEffect(() => {
        setRounds(0);
        setLevelScore(0);
        setOptions(pickOptions(3));
        setTargetPos(Math.floor(Math.random() * 3));
    }, []);

    // nextRoundSetup: prepara nuevas opciones y objetivo para la siguiente repetición
    const nextRoundSetup = () => {
        const newOptions = pickOptions(3);
        setOptions(newOptions);
        setTargetPos(Math.floor(Math.random() * 3));
    };

    // handleChoice: procesar la selección del usuario
    // - si es correcta: sumar punto, avanzar ronda (o finalizar nivel)
    // - si es incorrecta: restar punto global y permanecer en la misma repetición
    const handleChoice = (choicePos) => {
        const correct = choicePos === targetPos;
        const selectedColor = COLORS[options[choicePos]];

        // set animated feedback so CSS classes apply
        setAnimatedPos(choicePos);
        setAnimType(correct ? "correct" : "incorrect");

        if (correct) {
            // Pronunciar el color correcto en inglés
            speakEnglish(selectedColor.label);

            const updatedLevelScore = levelScore + 1;
            setLevelScore(updatedLevelScore);
            addToTotal && addToTotal(1);
            const nextRound = rounds + 1;
            setRounds(nextRound);

            // wait for the animation to play, then either finish or prepare next round
            setTimeout(() => {
                setAnimatedPos(null);
                setAnimType(null);
                if (nextRound >= 5) {
                    // finalizar nivel y pasar la puntuación del nivel a onFinish
                    onFinish && onFinish(updatedLevelScore);
                } else {
                    nextRoundSetup();
                }
            }, 400);
        } else {
            // incorrect: subtract a global point and show animation but do not advance round
            addToTotal && addToTotal(-1);
            setLevelScore((s) => s - 1);

            // clear the animation after a short moment so user sees feedback
            setTimeout(() => {
                setAnimatedPos(null);
                setAnimType(null);
            }, 400);
        }
    };

    const percent = Math.round((rounds / 5) * 100);

    return (
        <div className="ig-card">
            <div className="ig-header">
                <div>
                    <h3 className="ig-title">{title || "Colors — Match the word"}</h3>
                    <div className="ig-subtitle">Selecciona el color que corresponda a la palabra. 5 aciertos para completar el nivel.</div>
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
                    const c = COLORS[optIndex];
                    const classes = ["ig-btn"];
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
                                width: 140,
                                height: 120,
                                background: c.css,
                                border: "none",
                                borderRadius: 12,
                                cursor: "pointer",
                                color: "white",
                                fontSize: 18,
                            }}
                        />
                    );
                })}
            </div>
            <div style={{ marginTop: 8, textAlign: "center" }}>
                <div style={{ display: "inline-block", padding: 24, border: "2px dashed #ccc", borderRadius: 8, minWidth: 220 }}>
                    <div style={{ fontSize: 20, fontWeight: 600 }}>{COLORS[options[targetPos]].label}</div>
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

export default Game_1;