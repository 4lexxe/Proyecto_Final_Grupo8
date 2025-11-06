import { useState, useEffect } from "react";
import { speakSpanish } from "../../utils/speechUtils";
import "../../assets/css/games.css";

const DAYS = [
  { es: "lunes", en: "Monday" },
  { es: "martes", en: "Tuesday" },
  { es: "miércoles", en: "Wednesday" },
  { es: "jueves", en: "Thursday" },
  { es: "viernes", en: "Friday" },
  { es: "sábado", en: "Saturday" },
  { es: "domingo", en: "Sunday" },
];

// pickOptions: elige `count` índices distintos de DAYS aleatoriamente
function pickOptions(count = 3) {
  const indices = new Set();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * DAYS.length));
  }
  return Array.from(indices);
}

function Game_4({ title, onFinish, addToTotal, totalScore }) {
  // rounds: cuántos aciertos correctos se han conseguido en este nivel
  const [rounds, setRounds] = useState(0);
  // levelScore: puntuación local del nivel
  const [levelScore, setLevelScore] = useState(0);
  // options: índices de DAYS mostrados (3 opciones)
  const [options, setOptions] = useState(() => pickOptions(3));
  // targetPos: posición (0..2) de la opción correcta dentro de `options`
  const [targetPos, setTargetPos] = useState(() => Math.floor(Math.random() * 3));

  useEffect(() => {
    setRounds(0);
    setLevelScore(0);
    setOptions(pickOptions(3));
    setTargetPos(Math.floor(Math.random() * 3));
  }, []);

  // nextRoundSetup: preparar nuevas opciones y objetivo para la siguiente repetición
  const nextRoundSetup = () => {
    const newOptions = pickOptions(3);
    setOptions(newOptions);
    setTargetPos(Math.floor(Math.random() * 3));
  };

  // animated feedback state
  const [animatedPos, setAnimatedPos] = useState(null);
  const [animType, setAnimType] = useState(null);

  // handleChoice: maneja la elección del usuario; sumar/restar puntos y avanzar si corresponde
  const handleChoice = (choicePos) => {
    const correct = choicePos === targetPos;
    const selectedDay = DAYS[options[choicePos]];

    if (correct) {
      setAnimatedPos(choicePos);
      setAnimType("correct");

      // Pronunciar el día en español (porque seleccionan español)
      speakSpanish(selectedDay.es);

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
          <h3 className="ig-title">{title || "Weekdays — Días de la semana"}</h3>
          <div className="ig-subtitle">Selecciona el día en español que corresponde al nombre en inglés. 5 aciertos para completar el nivel.</div>
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
          const d = DAYS[optIndex];
          const classes = ["ig-btn"];
          if (animatedPos === pos) {
            if (animType === "incorrect") classes.push("shake", "ig-incorrect");
            else if (animType === "correct") classes.push("ig-correct");
          }
          return (
            <button
              key={d.es + "-" + pos}
              onClick={() => handleChoice(pos)}
              aria-label={d.es}
              className={classes.join(" ")}
              style={{
                minWidth: 120,
                height: 70,
                background: "white",
                border: "2px solid #ddd",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
                textTransform: "capitalize",
              }}
            >
              {d.es}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 8, textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: 24, border: "2px dashed #ccc", borderRadius: 8, minWidth: 220 }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{DAYS[options[targetPos]].en}</div>
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

export default Game_4;