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

export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Add your API call here to register the user
    console.log("Registering user:", { name, email, password });

    // After successful signup, redirect to login or home
    navigate("/login");
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
          Unete a la comunidad mas pionera de mus!
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
