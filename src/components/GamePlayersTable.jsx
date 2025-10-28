import { useState, useContext } from "react";
import { Avatar, Badge, Button, Group, Table, Text } from "@mantine/core";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Notification } from "./Notification"; // tu componente Notification

export function GamePlayersTable({ game, onUpdate }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const authToken = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState(null);

  if (!game || !user) return <p>Loading...</p>;

  // Combine teams and fill empty slots
  const players = [
    ...game.teamA.map((p) => ({ ...p, team: "A", active: true })),
    ...game.teamB.map((p) => ({ ...p, team: "B", active: true })),
  ];
  let teamACount = game.teamA.length;
  let teamBCount = game.teamB.length;

  while (teamACount < 2) {
    players.push({
      _id: `empty-A-${teamACount}`,
      name: "Haz click para unirte",
      email: "",
      avatar: "",
      team: "A",
      active: false,
    });
    teamACount++;
  }
  while (teamBCount < 2) {
    players.push({
      _id: `empty-B-${teamBCount}`,
      name: "Haz click para unirte",
      email: "",
      avatar: "",
      team: "B",
      active: false,
    });
    teamBCount++;
  }

  const isUserInGame = [...game.teamA, ...game.teamB].some((p) => p._id === user._id);

  const handleJoin = async (team) => {
    if (!authToken) return alert("Tienes que estar loggeado para unirte a la partida");
    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/games/${game.id}/join`,
        { team },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      onUpdate();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al unirte a la partida");
    } finally {
      setLoading(false);
    }
  };

  const handleLeave = async () => {
    if (!authToken) return alert("Debes estar logueado para salir de la partida");
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/games/${game.id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (game.teamA.length + game.teamB.length <= 1) {
        setNotif({ message: "La partida ha sido eliminada", type: "error" });
        setTimeout(() => navigate("/games"), 1500); // espera antes de navegar
      } else {
        setNotif({ message: "Has abandonado la partida", type: "success" });
        onUpdate();
      }
    } catch (err) {
      console.error(err);
      setNotif({ message: err.response?.data?.message || "Error al salir de la partida", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const rows = players.map((player) => (
    <Table.Tr key={player._id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={player.avatar || "https://i.imgur.com/xtlflAU.png"} radius={40} />
          <div>
            <Text fz="sm" fw={500}>{player.name}</Text>
            {player.email && <Text fz="xs" c="dimmed">{player.email}</Text>}
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge color={player.team === "A" ? "blue" : "green"} variant="light">Equipo {player.team}</Badge>
      </Table.Td>
      <Table.Td>
        {player.active ? (
          player._id === user._id ? (
            <Button fullWidth size="xs" color="red" variant="outline" loading={loading} onClick={handleLeave}>
              Abandonar partida
            </Button>
          ) : (
            <Badge fullWidth variant="light" color="teal">Activo</Badge>
          )
        ) : (
          !isUserInGame && (
            <Button fullWidth size="xs" color={player.team === "A" ? "blue" : "green"} variant="outline" loading={loading} onClick={() => handleJoin(player.team)}>
              Unirse al equipo {player.team}
            </Button>
          )
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      {notif && <Notification message={notif.message} type={notif.type} onClose={() => setNotif(null)} />}
      <Table.ScrollContainer minWidth={600}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Jugador</Table.Th>
              <Table.Th>Equipo</Table.Th>
              <Table.Th>Estado</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
