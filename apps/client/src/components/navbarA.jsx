import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Image,
  useColorModeValue,
  Button,
  Text,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/SprintPits_Logo.jpg';
import letraImage from '../assets/SprintPits_Letra.png';
import { useEffect, useState } from 'react';

export default function NavBarA() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
        navigate('/admin/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    localStorage.removeItem('username'); // Elimina el nombre de usuario
    setIsLoggedIn(false); // Actualiza el estado
    navigate('/admin/login'); // Redirige al usuario a la página de login
  };

  return (
    <>
      <Box
        bg={useColorModeValue('#2D284A', '#BEBDC0')}
        px={4}
        position="fixed"
        width="100%"
        top={0}
        zIndex="10000"
        boxShadow="md">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Link to="/admin/dashboard">
              <Avatar boxSize="60px" src={logoImage} />
            </Link>
            <Link to="/admin/dashboard">
              <Image src={letraImage} alt="Logo" width="160px" height="auto" objectFit="contain" />
            </Link>
          </HStack>

          {/* Botón de inicio/cierre de sesión */}
          <HStack spacing={4}>
            {isLoggedIn ? (
              <>
                <Text color="white" fontSize="sm">
                  Bienvenido, {localStorage.getItem('username')}
                </Text>
                <Button colorScheme="red" size="sm" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => navigate('/')} // Redirige al usuario a la página de login
              >
                Volver a Sprint Pits
              </Button>
            )}
          </HStack>
        </Flex>
      </Box>
      <Box height="16" />
    </>
  );
}

NavBarA.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};