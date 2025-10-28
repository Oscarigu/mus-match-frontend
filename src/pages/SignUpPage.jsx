import React, { useState } from "react";
import axios from "axios";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Button,
  Anchor,
  Group,
  Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const requestBody = { email, password, name };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        // Si el registro es exitoso, redirige al login
        navigate("/login");
      })
      .catch((err) => {
        const msg = 
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : "Error en el registro";
        setErrorMessage(msg);
        console.error("Signup error:", err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Paper
        shadow="md"
        radius="md"
        p="xl"
        withBorder
        style={{
          width: "85vw",
          maxWidth: "700px",
          minHeight: "450px",
        }}
      >
        <Title order={2} ta="center" mb="md">
          Únete a la comunidad más pionera de mus!
        </Title>

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              required
            />

            <TextInput
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />

            <Button type="submit" fullWidth mt="md">
              Sign Up
            </Button>
          </Stack>
        </form>

        {errorMessage && (
          <Text color="red" size="sm" mt="sm">
            {errorMessage}
          </Text>
        )}

        <Group justify="center" mt="md">
          <Text size="sm" c="dimmed">
            ¿Ya tienes una cuenta?
          </Text>
          <Anchor
            size="sm"
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          >
            Login
          </Anchor>
        </Group>
      </Paper>
    </div>
  );
}