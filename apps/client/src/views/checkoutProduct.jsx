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
  HStack,
  useToast,
} from '@chakra-ui/react';
import DividerText from '../components/dividerText';
import axios from 'axios';

const CheckoutProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });
  const [cartItems, setCartItems] = useState([]);
  const shippingCost = 0; // Precio fijo de envío
  const toast = useToast();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart); // Cargar el carrito al inicio
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calcular el total correctamente
    const totalPrice = cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.precio) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      return total + itemPrice * itemQuantity;
    }, 0) + shippingCost;

    const orderData = {
      ...formData,
      cartItems,
      totalPrice,
    };

    try {
      const response = await axios.post('http://200.35.159.55:3000/server/email/order', orderData);
      toast({
        title: 'Orden enviada',
        description: 'Tu orden ha sido enviada exitosamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Limpiar el carrito después de enviar la orden
      localStorage.removeItem('cart');
      setCartItems([]);
    } catch (error) {
      console.error('Error enviando la orden:', error);
      toast({
        title: 'Error',
        description: 'Hubo un problema al enviar tu orden. Por favor, intenta nuevamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');

  // Calcular el total correctamente
  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.precio) || 0;
    const itemQuantity = parseInt(item.quantity) || 0;
    return total + itemPrice * itemQuantity;
  }, 0) + shippingCost;

  return (
    <Box
      maxW="1200px"
      mx="auto"
      p={8}
      mt={8}
      borderWidth={1}
      borderRadius="lg"
      bg={bgColor}
      boxShadow="lg"
    >
      <DividerText
        title="¡Finaliza tu Orden de Compra!"
        subtitle="Una vez enviada la orden, nos contactaremos contigo para gestionar el pago y el envío de tus productos."
      />
      <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6} mt={6}>
        <GridItem>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl id="name" isRequired>
                <FormLabel>Nombre completo</FormLabel>
                <Input
                  name="name"
                  type="text"
                  placeholder="Nombre Apellido"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Dirección</FormLabel>
                <Input
                  name="address"
                  type="text"
                  placeholder="Las Direcciones 1234"
                  value={formData.address}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="+56912345678"
                  value={formData.phone}
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
                {cartItems.map((item, index) => {
                  const itemPrice = parseFloat(item.precio) || 0;
                  const itemQuantity = parseInt(item.quantity) || 0;
                  const subtotal = itemPrice * itemQuantity;

                  return (
                    <Box key={index} borderBottom="1px" borderColor="gray.200" pb={2}>
                      <HStack justify="space-between">
                        <Text fontWeight="bold">{item.nombre}</Text>
                        <Text>${itemPrice.toFixed(2)}</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text>Cantidad: {itemQuantity}</Text>
                        <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
                      </HStack>
                    </Box>
                  );
                })}
                {/* <HStack justify="space-between">
                  <Text>Envío</Text>
                  <Text>${shippingCost.toFixed(2)}</Text>
                </HStack>
                <Divider /> */}
                <HStack justify="space-between" fontWeight="bold">
                  <Text>Total</Text>
                  <Text>${totalPrice.toFixed(2)}</Text>
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

export default CheckoutProduct;