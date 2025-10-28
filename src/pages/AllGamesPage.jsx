import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

function AllGamesPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/games`)
      .then((response) => {
        setGames(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching games");
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="games-container">
      <Link to="/newgame">
        <Button
          fullWidth
          variant="filled"
          color="teal"
          size="lg"
          rightSection={<IconArrowRight size={14} />}
        >
          Crear partida
        </Button>
      </Link>
      <h1>Partidas disponibles</h1>
      {games.length === 0 ? (
        <p>No games scheduled yet.</p>
      ) : (
        <div className="games-list">
          {games.map((game) => (
            <Link key={game.id} to={`/games/${game.id}`} className="game-card">
              <div className="game-info">
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(game.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Numero de jugadores:</strong> {game.nPlayers}
                </p>
                <p>
                  <strong>Localidad:</strong> {game.localidad}
                </p>
              </div>
              <div
                className={
                  game.nPlayers < 4 ? "status available" : "status complete"
                }
              >
                {game.nPlayers < 4 ? "Disponible" : "Completa"}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllGamesPage;
