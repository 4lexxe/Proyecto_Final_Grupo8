import { useState } from "react";
import Game_1 from "../components/InglishGames/Game_1.jsx";
import Game_2 from "../components/InglishGames/Game_2.jsx";
import Game_3 from "../components/InglishGames/Game_3.jsx";
import Game_4 from "../components/InglishGames/Game_4.jsx";
import Game_5 from "../components/InglishGames/Game_5.jsx";

export const Games = () => {
    // Número total de niveles/minijuegos
    const totalLevels = 5;
    // Índice del nivel actual (0-based). setCurrentIndex avanza al siguiente nivel.
    const [currentIndex, setCurrentIndex] = useState(0);
    // Array con la puntuación por nivel; null = no jugado aún
    const [scores, setScores] = useState(Array(totalLevels).fill(null));
    // Puntuación total acumulada (estado para poder persistir en DB)
    const [totalScore, setTotalScore] = useState(0);

    // Define los componentes de cada nivel. Usamos cada componente específico.
    const games = [
        { id: "game-1", title: "Minijuego 1", Component: Game_1 },
        { id: "game-2", title: "Minijuego 2", Component: Game_2 },
        { id: "game-3", title: "Minijuego 3", Component: Game_3 },
        { id: "game-4", title: "Minijuego 4", Component: Game_4 },
        { id: "game-5", title: "Minijuego 5", Component: Game_5 },
    ];

    // Evitar error cuando currentIndex === totalLevels (resumen final):
    // si el índice está fuera de rango, CurrentGame será null.
    const CurrentGame = currentIndex < games.length ? games[currentIndex].Component : null;

    // handleFinish: recibe la puntuación del nivel y la guarda en `scores`, luego avanza
    const handleFinish = (scoreOrObj) => {
        const score = scoreOrObj;

        // Guardar la puntuación del nivel actual
        setScores((prev) => {
            const copy = [...prev];
            copy[currentIndex] = score;
            return copy;
        });

        // Avanzar al siguiente nivel o marcar resumen final
        if (currentIndex + 1 < totalLevels) {
            setCurrentIndex((i) => i + 1);
        } else {
            setCurrentIndex(totalLevels); // valor fuera de rango indica resumen final
        }
    };


    // Si currentIndex >= totalLevels mostramos el resumen final (UI más visual)
    if (currentIndex >= totalLevels) {
        const playedCount = scores.filter((s) => s != null).length;
        const percentComplete = Math.round((playedCount / totalLevels) * 100);

        return (
            <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
                <h1>Resumen final</h1>

                <div className="ig-card" style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                        <div>
                            <div className="final-score-big">{totalScore}</div>
                            <div className="final-meta">Puntuación total acumulada</div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 14, color: "#556772" }}>Niveles completados</div>
                            <div style={{ fontSize: 20, fontWeight: 700 }}>{playedCount} / {totalLevels}</div>
                        </div>
                    </div>

                    <div style={{ marginTop: 12 }}>
                        <div className="ig-progress" aria-hidden="true">
                            <span style={{ width: `${percentComplete}%` }} />
                        </div>
                    </div>
                </div>

                <div className="final-grid">
                    {games.map((g, i) => {
                        const sc = scores[i];
                        const pct = sc == null ? 0 : Math.max(0, Math.min(100, Math.round((sc / 5) * 100)));
                        let badgeClass = "badge-pending";
                        if (sc == null) badgeClass = "badge-pending";
                        else if (sc >= 4) badgeClass = "badge-good";
                        else if (sc >= 1) badgeClass = "badge-mid";
                        else badgeClass = "badge-bad";

                        return (
                            <div className="final-item ig-card" key={g.id}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <div style={{ fontWeight: 700 }}>{g.title}</div>
                                        <div style={{ fontSize: 13, color: "#6b7b88" }}>{sc == null ? "No jugado" : `${sc} puntos`}</div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div className={`final-badge ${badgeClass}`}>{sc == null ? "Pendiente" : `${pct}%`}</div>
                                    </div>
                                </div>

                                <div style={{ marginTop: 10 }}>
                                    <div className="ig-progress" aria-hidden="true">
                                        <span style={{ width: `${pct}%` }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
            <h1>Minijuegos</h1>
            <div style={{ marginBottom: 8 }}>Nivel {currentIndex + 1} / {totalLevels}</div>
            <CurrentGame
                title={games[currentIndex].title}
                onFinish={handleFinish}
                addToTotal={(delta) => setTotalScore((prev) => prev + delta)}
                totalScore={totalScore}
            />
        </div>
    );
};