import React, { useState } from "react";
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

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
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
          width: "85vw", // use viewport width
          maxWidth: "700px", // optional, prevents it from getting too wide
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

        <Group justify="center" mt="md">
          <Text size="sm" c="dimmed">
            ¿No tienes cuenta todavía?
          </Text>
          <Anchor
            size="sm"
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer" }}
          >
            Sign Up
          </Anchor>
        </Group>
      </Paper>
    </div>
  );
}
