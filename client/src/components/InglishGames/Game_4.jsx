import { useState, useEffect } from "react";
import { FaCalendarAlt } from 'react-icons/fa';
import { speakSpanish } from "../../utils/speechUtils";
import { playCorrectSound, playIncorrectSound } from "../../utils/soundUtils";
import MonsterCelebration from "./MonsterCelebration";
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
  const [showMonsterCelebration, setShowMonsterCelebration] = useState(false);

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
  const handleChoice = async (choicePos) => {
    const correct = choicePos === targetPos;
    const selectedDay = DAYS[options[choicePos]];

    if (correct) {
      setAnimatedPos(choicePos);
      setAnimType("correct");
      setShowMonsterCelebration(true);

      await playCorrectSound();
      await speakSpanish(selectedDay.es);

      const updatedLevelScore = levelScore + 1;
      setTimeout(() => {
        setLevelScore(updatedLevelScore);
        addToTotal && addToTotal(1);
        const nextRound = rounds + 1;
        setRounds(nextRound);
        setAnimatedPos(null);
        setAnimType(null);
        setShowMonsterCelebration(false);
        if (nextRound >= 5) {
          onFinish(updatedLevelScore);
          return;
        }
        nextRoundSetup();
      }, 2500);
    } else {
      setAnimatedPos(choicePos);
      setAnimType("incorrect");
      playIncorrectSound();
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
    <div className="ig-card" style={{ position: 'relative' }}>
      {showMonsterCelebration && <MonsterCelebration />}
      
      <div className="ig-header">
        <h3 className="ig-title">
          <FaCalendarAlt style={{ marginRight: '12px', color: '#ff6b9d' }} />
          Weekdays — Días de la semana
        </h3>
        <div className="ig-subtitle">Selecciona el día en español que corresponde al nombre en inglés</div>
        
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
          <div className="ig-question-text">{DAYS[options[targetPos]].en}</div>
        </div>
      </div>

      <div className="ig-options ig-options-grid">
        {options.map((optIndex, pos) => {
          const d = DAYS[optIndex];
          const classes = ["ig-btn", "ig-day-btn"];
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
            >
              {d.es}
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

export default Game_4;