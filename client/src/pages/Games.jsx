import { useState } from "react";
import Game_1 from "../components/InglishGames/Game_1";
import Game_2 from "../components/InglishGames/Game_2";
import Game_3 from "../components/InglishGames/Game_3";
import Game_4 from "../components/InglishGames/Game_4";
import Game_5 from "../components/InglishGames/Game_5";
import GameCompletionScreen from "../components/InglishGames/GameCompletionScreen";
import "../assets/css/games.css";
import { authService } from '../services/authService';

const GAME_TITLES = [
  "Colors — Match the word",
  "Animals — Match the word",
  "Numbers — Words and Digits",
  "Weekdays — Días de la semana",
  "Body Parts — Match the Word",
];

export function Games() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const addToTotal = (delta) => {
    setTotalScore((s) => s + delta);
  };

  const handleGameFinish = async (levelScore) => {
    console.log(`Juego ${currentGameIndex + 1} finalizado. Puntos del nivel: ${levelScore}`);
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentGameIndex < 4) {
        setCurrentGameIndex(currentGameIndex + 1);
        setIsTransitioning(false);
      } else {
        // Solo intentar guardar si hay usuario logueado
        (async () => {
          try {
            const user = authService.getCurrentUser();
            if (user) {
              await authService.updateMaxPuntos(totalScore).catch(err => 
                console.log('No se pudo actualizar maxPuntos:', err.message)
              );
            }
          } catch (e) {
            console.log('Error al intentar guardar maxPuntos', e.message || e);
          } finally {
            setShowCompletion(true);
          }
        })();
      }
    }, 550);
  };

  const handleCompletionFinish = () => {
    setShowCompletion(false);
    setCurrentGameIndex(0);
    setTotalScore(0);
    setIsTransitioning(false);
  };

  const renderGame = () => {
    const gameProps = {
      title: GAME_TITLES[currentGameIndex],
      onFinish: handleGameFinish,
      addToTotal,
      totalScore,
    };

    switch (currentGameIndex) {
      case 0:
        return <Game_1 key={`game-1-${currentGameIndex}`} {...gameProps} />;
      case 1:
        return <Game_2 key={`game-2-${currentGameIndex}`} {...gameProps} />;
      case 2:
        return <Game_3 key={`game-3-${currentGameIndex}`} {...gameProps} />;
      case 3:
        return <Game_4 key={`game-4-${currentGameIndex}`} {...gameProps} />;
      case 4:
        return <Game_5 key={`game-5-${currentGameIndex}`} {...gameProps} />;
      default:
        return null;
    }
  };

  if (showCompletion) {
    return <GameCompletionScreen totalScore={totalScore} onComplete={handleCompletionFinish} />;
  }

  return (
    <div className="games-page">
      <div className="container" style={{ paddingTop: "20px", position: "relative" }}>
        <div style={{ 
          textAlign: "center", 
          marginBottom: "30px",
          animation: "fadeIn 0.6s ease-out"
        }}>
          <h1 style={{ 
            color: "#8f4790", 
            fontWeight: 800,
            fontSize: "42px",
            marginBottom: "10px"
          }}>
            Minijuegos de Inglés
          </h1>
          <p style={{ 
            color: "#666", 
            fontSize: "18px",
            fontWeight: 500
          }}>
            Juego {currentGameIndex + 1} de 5
          </p>
          <div style={{
            width: "100%",
            maxWidth: "600px",
            height: "8px",
            background: "#e5e5e5",
            borderRadius: "4px",
            margin: "20px auto",
            overflow: "hidden"
          }}>
            <div style={{
              width: `${((currentGameIndex + 1) / 5) * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg, #8f4790 0%, #a855a8 100%)",
              borderRadius: "4px",
              transition: "width 0.6s ease-out"
            }} />
          </div>
        </div>
        
        <div 
          className={`game-transition-wrapper ${isTransitioning ? 'game-exit' : 'game-enter'}`}
        >
          {renderGame()}
        </div>
      </div>
    </div>
  );
}