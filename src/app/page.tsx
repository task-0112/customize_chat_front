// src/app/page.tsx

'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/v1/tests");
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box bg="gray.100" minH="100vh">
      <Container maxW="container.lg" py={10}>
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Heading as="h1" size="xl" mb={4}>
            Welcome to the Homepage
          </Heading>
          <Text fontSize="xl">Message from the server: {message}</Text>
        </Box>
      </Container>
    </Box>
  );
}