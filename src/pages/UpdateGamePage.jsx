import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Container,
  Title,
  Group,
  Paper,
  Notification,
  Loader,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import axios from "axios";
import { IconCheck, IconX } from "@tabler/icons-react";

function UpdateGamePage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: {
      localidad: "",
      location: "",
      date: null,
    },
    validate: {
      localidad: (value) => (value.trim().length === 0 ? "Required" : null),
      location: (value) => (value.trim().length === 0 ? "Required" : null),
      date: (value) => (!value ? "Required" : null),
    },
  });

  // ✅ Fetch game data using Axios
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get(`${API_URL}/api/games/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const game = response.data;

        // Set form values with fetched data
        form.setValues({
          localidad: game.localidad || "",
          location: game.location || "",
          date: new Date(game.date),
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error cargando la partida");
        setLoading(false);
      }
    };

    fetchGame();
  }, [API_URL, id]);

  // ✅ Handle update via Axios
  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.put(
        `${API_URL}/api/games/${id}`,
        {
          localidad: values.localidad,
          location: values.location,
          date: values.date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Partida actualizada correctamente!");
      setTimeout(() => navigate(`/games/${id}`), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error actualizando la partida");
    }
  };

  if (loading) return <Loader size="lg" />;

  return (
    <Container size="sm" py="xl">
      <Title order={2} align="center" mb="md">
        Editar partida
      </Title>

      <Paper withBorder shadow="sm" p="lg" radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Localidad"
            {...form.getInputProps("localidad")}
            mb="sm"
          />
          <TextInput
            label="Lugar exacto"
            {...form.getInputProps("location")}
            mb="sm"
          />
          <DateTimePicker
            label="Fecha y Hora"
            valueFormat="DD/MM/YYYY HH:mm"
            {...form.getInputProps("date")}
            mb="md"
          />

          <Group justify="center" mt="md">
            <Button type="submit" color="blue">
              Guardar cambios
            </Button>
            <Button variant="light" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
          </Group>
        </form>
      </Paper>

      {message && (
        <Notification
          icon={<IconCheck size={18} />}
          color="green"
          mt="md"
          onClose={() => setMessage(null)}
        >
          {message}
        </Notification>
      )}
      {error && (
        <Notification
          icon={<IconX size={18} />}
          color="red"
          mt="md"
          onClose={() => setError(null)}
        >
          {error}
        </Notification>
      )}
    </Container>
  );
}

export default UpdateGamePage;
