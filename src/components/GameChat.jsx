import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Textarea, Button, Card, Text } from "@mantine/core";

export function GameChat({ gameId }) {
  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const [conversation, setConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // === Fetch conversation ===
  const fetchConversation = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/conversations?game=${gameId}`);
      const convo = res.data?.find((c) => c.game._id === gameId);
      setConversation(convo || null);
    } catch (err) {
      console.error("Error fetching conversation:", err);
    } finally {
      setLoading(false);
    }
  };

  // === Send message ===
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !conversation) return;

    setSending(true);
    try {
      await axios.post(
        `${API_URL}/api/conversations/${conversation._id}/message`,
        { user: user._id, message },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );
      setMessage("");
      await fetchConversation(); // refresh chat immediately
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSending(false);
    }
  };

  // === Initial fetch + live polling every 30s ===
  useEffect(() => {
    if (!gameId) return;

    fetchConversation(); // initial load

    // set up polling
    const interval = setInterval(() => {
      fetchConversation();
    }, 30000); // every 30 seconds

    // clean up when component unmounts or gameId changes
    return () => clearInterval(interval);
  }, [gameId]);

  // === Loading states ===
  if (loading) return <p>Cargando chat...</p>;
  if (!conversation) return <p>No se ha encontrado un chat para la partida.</p>;

  // === Check if current user is part of the game ===
  const isUserInGame = conversation.users.some((u) => u._id === user._id);
  if (!isUserInGame) return null;

  // === Render chat ===
  return (
    <Card shadow="sm" padding="lg" mt="xl" radius="md" withBorder>
      <Text fw={600} mb="sm">
        💬 Chat de la partida
      </Text>

      <div
        style={{
          maxHeight: "250px",
          overflowY: "auto",
          backgroundColor: "#f8f9fa",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        {conversation.messages.length === 0 ? (
          <Text size="sm" c="dimmed">
            Sin mensajes.
          </Text>
        ) : (
          conversation.messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.user._id === user._id ? "right" : "left",
                marginBottom: "0.5rem",
              }}
            >
              <Text size="sm">
                <strong>{msg.user.name || "Player"}:</strong> {msg.message}
              </Text>
              <Text size="xs" c="dimmed">
                {new Date(msg.sentAt).toLocaleTimeString()}
              </Text>
            </div>
          ))
        )}
      </div>

      {conversation.isLocked ? (
        <Text size="sm" c="dimmed">
          🔒 Chat bloqueado — esperando a ser 4 jugadores.
        </Text>
      ) : (
        <form onSubmit={handleSend}>
          <Textarea
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={sending}
          />
          <Button mt="sm" type="submit" loading={sending}>
            Send
          </Button>
        </form>
      )}
    </Card>
  );
}
