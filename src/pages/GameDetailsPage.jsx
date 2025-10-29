import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { GamePlayersTable } from "../components/GamePlayersTable";
import { GameChat } from "../components/GameChat"; // ⬅️ new import
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mantine/core";

function GameDetailsPage() {
  const { user } = useContext(AuthContext);
  const gameId = useParams().id;
  const API_URL = import.meta.env.VITE_API_URL;
  const [game, setGame] = useState(null);
  const gametoediturl = `/games/${gameId}/edit`;

  const fetchGame = () => {
    axios
      .get(`${API_URL}/api/games/${gameId}`)
      .then((res) => setGame(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchGame();
  }, [gameId]);

  if (!game) return <p>Loading...</p>;

  const isHost = user && game?.host?._id === user._id;
  const isPlayer =
    user &&
    (game.teamA.some((p) => p._id === user._id) ||
      game.teamB.some((p) => p._id === user._id));

  return (
    <div>
      <h1>
        Partida en {game.location} ({game.localidad})
      </h1>
      <p>
        <strong>Fecha: {new Date(game.date).toLocaleString()}</strong>
      </p>

      {isHost && (
        <Link to={gametoediturl}>
          <Button color="blue">✏️ Editar partida</Button>
        </Link>
      )}

      <GamePlayersTable game={game} onUpdate={fetchGame} />

      {/* ✅ Only show chat if user is in the game */}
      {isPlayer && <GameChat gameId={gameId} />}
    </div>
  );
}

export default GameDetailsPage;
