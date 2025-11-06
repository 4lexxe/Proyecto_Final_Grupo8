import { useState, useEffect } from "react";
import { FaHandPaper } from 'react-icons/fa';
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

function Game_5({onFinish, addToTotal, totalScore }) {
  // rounds: aciertos correctos completados en este nivel
  const [rounds, setRounds] = useState(0);
  // levelScore: puntuación local del nivel (puede decrementar con fallos)
  const [levelScore, setLevelScore] = useState(0);
  // options: índices de las partes mostradas (4 imágenes)
  const [options, setOptions] = useState(() => pickOptions(4));
  // targetPos: posición (0..3) dentro de `options` que es la correcta
  const [targetPos, setTargetPos] = useState(() => Math.floor(Math.random() * 4));
  const [showMonsterCelebration, setShowMonsterCelebration] = useState(false);

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

  const handleChoice = async (choicePos) => {
    const correct = choicePos === targetPos;
    const selectedPart = PARTS_WITH_SRC[options[choicePos]];
    
    if (correct) {
      setAnimatedPos(choicePos);
      setAnimType("correct");
      setShowMonsterCelebration(true);
      
      await playCorrectSound();
      await speakEnglish(selectedPart.en);
      
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
          <FaHandPaper style={{ marginRight: '12px', color: '#ff6b9d' }} />
          Body Parts — Match the Word
        </h3>
        <div className="ig-subtitle">Selecciona la imagen que corresponde a la palabra en inglés</div>
        
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
          <div className="ig-question-text">{PARTS_WITH_SRC[options[targetPos]].en}</div>
        </div>
      </div>

      <div className="ig-options ig-options-grid-4">
        {options.map((optIndex, pos) => {
          const p = PARTS_WITH_SRC[optIndex];
          const classes = ["ig-btn", "ig-image-btn"];
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
            >
              <img src={p.src} alt={p.es} className="body-part-image" />
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

export default Game_5;