import {
  Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, Text,
  useColorModeValue, Link, useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../config";

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false); // Inicializa el estado
  const navigate = useNavigate();
  const toast = useToast(); // Para mostrar notificaciones

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const handleLogin = async () => {
    setLoading(true); // Muestra el estado de carga
    try {
      const response = await axios.post(`${API_URL}/server/auth/login`, formData);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('username', response.data.username);
      console.log(response.data.username);

      toast({
        title: 'Inicio de sesión exitoso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/admin/dashboard'); // Navega a la página principal
    } catch (error) {
      toast({
        title: 'Error al iniciar sesión',
        description: error.response?.data?.message || 'Algo salió mal',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Termina el estado de carga
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Inicia Sesión</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Nombre de usuario</FormLabel>
              <Input
                type="text"
                placeholder="Nombre de usuario"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="********"
                onChange={handleInputChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                isLoading={loading} // Botón desactivado mientras carga
                loadingText="Iniciando sesión"
                bg="blue.400"
                color="white"
                _hover={{ bg: 'blue.500' }}
                onClick={handleLogin}
              >
                Iniciar Sesión
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}