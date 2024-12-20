import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useColorModeValue,
  Text,
  Grid,
  GridItem,
  Divider,
  Stack,
  HStack
} from '@chakra-ui/react';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  });
  const [cartItems, setCartItems] = useState([]);
  const shippingCost = 5.00; // Precio fijo de envío

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart); // Cargar el carrito al inicio
  }, []); // Este effect solo se ejecuta una vez al cargar el componente

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a un servidor
    console.log(formData);
  };

  const bgColor = useColorModeValue('white', 'gray.800');

  // Calcular el total
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0) + shippingCost;

  return (
    <Box
      maxW="1200px"
      mx="auto"
      p={8}
      mt={4}
      borderWidth={1}
      borderRadius="lg"
      bg={bgColor}
      boxShadow="lg"
    >
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Información de entrega
      </Heading>
      <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6}>
        <GridItem>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl id="name" isRequired>
                <FormLabel>Nombre completo</FormLabel>
                <Input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Dirección</FormLabel>
                <Input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
            </VStack>
          </form>
        </GridItem>
        <GridItem>
          <VStack spacing={4} align="stretch">
            <Heading as="h3" size="md">Resumen del Pedido</Heading>
            <Divider />
            <Box p={4} borderWidth={1} borderRadius="lg" bg={bgColor}>
              <Stack spacing={3}>
                {/* Mostrar los productos del carrito */}
                {cartItems.map((item, index) => (
                  <HStack key={index} justify="space-between">
                    <Text>{item.name}</Text>
                    <Text>${item.price}</Text>
                  </HStack>
                ))}
                <HStack justify="space-between">
                  <Text>Envío</Text>
                  <Text>${shippingCost}</Text>
                </HStack>
                <Divider />
                <HStack justify="space-between" fontWeight="bold">
                  <Text>Total</Text>
                  <Text>${totalPrice}</Text>
                </HStack>
              </Stack>
            </Box>
            <Button colorScheme="blue" size="lg" w="full" onClick={handleSubmit}>
              Confirmar Compra
            </Button>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Checkout;
