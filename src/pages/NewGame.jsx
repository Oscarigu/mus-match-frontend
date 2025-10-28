import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Container,
  Title,
  Group,
  Paper,
  Notification,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import axios from "axios";
import { IconCheck, IconX } from "@tabler/icons-react";

function NewGame() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (values) => {
    try {
      setMessage(null);
      setError(null);

      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${API_URL}/api/games`,
        {
          localidad: values.localidad,
          location: values.location,
          date: values.date, // already a full JS Date object
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Partida creada satisfactoriamente!");
      form.reset();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error creando la partida");
    }
  };

  return (
    <Container size="sm" py="xl">
      <Title order={2} align="center" mb="md">
        Crea una nueva partida
      </Title>

      <Paper withBorder shadow="sm" p="lg" radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Localidad"
            placeholder="Enter localidad"
            {...form.getInputProps("localidad")}
            mb="sm"
          />

          <TextInput
            label="Location"
            placeholder="Enter exact location"
            {...form.getInputProps("location")}
            mb="sm"
          />

          <DateTimePicker
            label="Fecha y Hora"
            placeholder="Escoje fecha y hora"
            valueFormat="DD/MM/YYYY HH:mm"
            {...form.getInputProps("date")}
            mb="md"
          />

          <Group justify="center" mt="md">
            <Button type="submit" color="blue">
              Create Game
            </Button>
          </Group>
        </form>
      </Paper>

      {message && (
        <Notification
          icon={<IconCheck size={18} />}
          color="green"
          title="Success"
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
          title="Error"
          mt="md"
          onClose={() => setError(null)}
        >
          {error}
        </Notification>
      )}
    </Container>
  );
}

export default NewGame;
