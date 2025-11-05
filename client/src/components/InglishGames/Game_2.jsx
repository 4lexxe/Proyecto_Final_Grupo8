import { useState, useEffect } from "react";
import "../../assets/css/games.css";

const ANIMALS = [
    { name: "chicken", label: "Chicken", emoji: "🐓" },
    { name: "dog", label: "Dog", emoji: "🐶" },
    { name: "monkey", label: "Monkey", emoji: "🐒" },
    { name: "cat", label: "Cat", emoji: "🐱" },
    { name: "horse", label: "Horse", emoji: "🐴" },
    { name: "cow", label: "Cow", emoji: "🐮" },
];

// pickOptions: elige `count` índices distintos aleatorios del arreglo ANIMALS
function pickOptions(count = 3) {
    const indices = new Set();
    while (indices.size < count) {
        indices.add(Math.floor(Math.random() * ANIMALS.length));
    }
    return Array.from(indices);
}

function Game_2({ title, onFinish, addToTotal, totalScore }) {
    // rounds: número de aciertos correctos completados en este nivel
    const [rounds, setRounds] = useState(0);
    // levelScore: puntuación local de este nivel (puede ser negativa)
    const [levelScore, setLevelScore] = useState(0);
    // options: índices de los animales mostrados en pantalla (3 elementos)
    const [options, setOptions] = useState(() => pickOptions(3));
    // targetPos: posición (0..2) dentro de `options` que es la correcta
    const [targetPos, setTargetPos] = useState(() => Math.floor(Math.random() * 3));

    useEffect(() => {
        setRounds(0);
        setLevelScore(0);
        setOptions(pickOptions(3));
        setTargetPos(Math.floor(Math.random() * 3));
    }, []);

    // nextRoundSetup: prepara nuevas opciones y objetivo para la siguiente repetición
    // nextRoundSetup: prepara nuevas opciones y objetivo para la siguiente repetición
    const nextRoundSetup = () => {
        const newOptions = pickOptions(3);
        setOptions(newOptions);
        setTargetPos(Math.floor(Math.random() * 3));
    };

    // animated feedback state
    const [animatedPos, setAnimatedPos] = useState(null);
    const [animType, setAnimType] = useState(null);

    // handleChoice: procesar la elección del jugador
    // - correcto: +1, avanzar a la siguiente repetición (o finalizar nivel)
    // - incorrecto: -1 y permanecer en la misma repetición
    const handleChoice = (choicePos) => {
        const correct = choicePos === targetPos;
        if (correct) {
            setAnimatedPos(choicePos);
            setAnimType("correct");
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
                    <h3 className="ig-title">{title || "Animals — Match the word"}</h3>
                    <div className="ig-subtitle">Selecciona el animal que corresponde al nombre mostrado. 5 aciertos para completar el nivel.</div>
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
                    const a = ANIMALS[optIndex];
                    const classes = ["ig-btn"];
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
                            style={{
                                width: 140,
                                height: 120,
                                background: "white",
                                border: "2px solid #ddd",
                                borderRadius: 12,
                                cursor: "pointer",
                                fontSize: 48,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <span style={{ lineHeight: 1 }}>{a.emoji}</span>
                        </button>
                    );
                })}
            </div>

            <div style={{ marginTop: 8, textAlign: "center" }}>
                <div style={{ display: "inline-block", padding: 24, border: "2px dashed #ccc", borderRadius: 8, minWidth: 220 }}>
                    <div style={{ fontSize: 20, fontWeight: 600 }}>{ANIMALS[options[targetPos]].label}</div>
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

export default Game_2;