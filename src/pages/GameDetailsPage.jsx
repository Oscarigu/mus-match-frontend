import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GamePlayersTable } from "../components/GamePlayersTable";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

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
    </div>
  );
}

export default GameDetailsPage;
