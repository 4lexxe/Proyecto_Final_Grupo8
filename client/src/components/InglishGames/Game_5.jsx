import { useState, useEffect } from "react";
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

// Precompute URLs for images relative to this module
const PARTS_WITH_SRC = PARTS.map((p) => ({
  ...p,
  src: new URL(`../../assets/img/cuerpo/${p.file}`, import.meta.url).href,
}));

// pickOptions: selecciona `count` índices distintos de la lista de partes
function pickOptions(count = 4) {
  const indices = new Set();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * PARTS_WITH_SRC.length));
  }
  return Array.from(indices);
}

function Game_5({ title, onFinish, addToTotal, totalScore }) {
  // rounds: aciertos correctos completados en este nivel
  const [rounds, setRounds] = useState(0);
  // levelScore: puntuación local del nivel (puede decrementar con fallos)
  const [levelScore, setLevelScore] = useState(0);
  // options: índices de las partes mostradas (4 imágenes)
  const [options, setOptions] = useState(() => pickOptions(4));
  // targetPos: posición (0..3) dentro de `options` que es la correcta
  const [targetPos, setTargetPos] = useState(() => Math.floor(Math.random() * 4));

  useEffect(() => {
    setRounds(0);
    setLevelScore(0);
    setOptions(pickOptions(4));
    setTargetPos(Math.floor(Math.random() * 4));
  }, []);

  const nextRoundSetup = () => {
    const newOptions = pickOptions(4);
    setOptions(newOptions);
    setTargetPos(Math.floor(Math.random() * 4));
  };

  // animated feedback state
  const [animatedPos, setAnimatedPos] = useState(null);
  const [animType, setAnimType] = useState(null);

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
          <h3 className="ig-title">{title || "Body Parts — Match the Word"}</h3>
          <div className="ig-subtitle">Selecciona la imagen que corresponde a la palabra en inglés. 5 aciertos para completar el nivel.</div>
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

      <div style={{ display: "flex", gap: 12, justifyContent: "center", margin: "16px 0", flexWrap: "wrap" }}>
        {options.map((optIndex, pos) => {
          const p = PARTS_WITH_SRC[optIndex];
          const classes = ["ig-btn"];
          if (animatedPos === pos) {
            if (animType === "incorrect") classes.push("shake", "ig-incorrect");
            else if (animType === "correct") classes.push("ig-correct");
          }
          return (
            <button
              key={p.file + "-" + pos}
              onClick={() => handleChoice(pos)}
              aria-label={p.es}
              className={classes.join(" ")}
              style={{
                width: 140,
                height: 140,
                background: "white",
                border: "2px solid #ddd",
                borderRadius: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 6,
              }}
            >
              <img src={p.src} alt={p.es} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 8, textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: 24, border: "2px dashed #ccc", borderRadius: 8, minWidth: 220 }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{PARTS_WITH_SRC[options[targetPos]].en}</div>
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

export default Game_5;