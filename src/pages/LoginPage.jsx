// ...existing code...
import React, { useState, useContext } from "react";
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

import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        const { authToken } = response.data;
        if (authToken) {
          // store token in context helper and verify user
          storeToken(authToken);
          authenticateUser(); // updates context (isLoggedIn, user)
          navigate("/"); // redirect to home (or adjust to /profile/:id)
        } else {
          setErrorMessage("Respuesta inesperada del servidor");
        }
      })
      .catch((err) => {
        const msg =
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : "Error al iniciar sesión";
        setErrorMessage(msg);
        console.error("Login error:", err);
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
          minHeight: "400px",
        }}
      >
        <Title order={2} ta="center" mb="md">
          ¡Es hora de jugar!
        </Title>

        <form onSubmit={handleSubmit}>
          <Stack>
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
              Login
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
            ¿No tienes cuenta todavía?
          </Text>
          <Anchor size="sm" href="/signup" style={{ cursor: "pointer" }}>
            Sign Up
          </Anchor>
        </Group>
      </Paper>
    </div>
  );
}
// ...existing code...