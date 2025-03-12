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
  Select,
  Textarea,
} from '@chakra-ui/react';
import DividerText from '../components/dividerText';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CheckoutService = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    service: location.state?.service || '', // Servicio seleccionado desde el PricingCard
    comments: '',
  });
  const [services] = useState([
    { title: 'Mantención Básica', price: 20000 },
    { title: 'Mantención Media', price: 35000 },
    { title: 'Mantención Full', price: 50000 },
    { title: 'Mantención Fixie', price: 25000 },
    { title: 'Mantención bicicleta de Triatlón', price: 40000 },
    { title: 'Taller de Ciclismo Urbano', price: 30000 },
  ]);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedService = services.find((s) => s.title === formData.service);
    const totalPrice = selectedService ? selectedService.price : 0;

    const orderData = {
      ...formData,
      totalPrice,
    };

    try {
      const response = await axios.post('http://200.35.159.55/server/email/service-order', orderData);
      toast({
        title: 'Orden enviada',
        description: 'Tu orden de servicio ha sido enviada exitosamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Limpiar el formulario después de enviar la orden
      setFormData({
        name: '',
        address: '',
        email: '',
        phone: '',
        service: '',
        comments: '',
      });
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

  const selectedService = services.find((s) => s.title === formData.service);
  const totalPrice = selectedService ? selectedService.price : 0;

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
        title="¡Agendemos tu Mantención!"
        subtitle="Una vez enviada la orden, nos contactaremos contigo para coordinar la mantención."
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
              <FormControl id="service" isRequired>
                <FormLabel>Servicio</FormLabel>
                <Select
                  name="service"
                  placeholder="Selecciona un servicio"
                  value={formData.service}
                  onChange={handleChange}
                >
                  {services.map((service, index) => (
                    <option key={index} value={service.title}>
                      {service.title} - ${service.price.toLocaleString()}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="comments">
                <FormLabel>Comentarios</FormLabel>
                <Textarea
                  name="comments"
                  placeholder="Agrega comentarios adicionales..."
                  value={formData.comments}
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
                {selectedService && (
                  <Box borderBottom="1px" borderColor="gray.200" pb={2}>
                    <HStack justify="space-between">
                      <Text fontWeight="bold">{selectedService.title}</Text>
                      <Text>${selectedService.price.toLocaleString()}</Text>
                    </HStack>
                  </Box>
                )}
                <HStack justify="space-between" fontWeight="bold">
                  <Text>Total</Text>
                  <Text>${totalPrice.toLocaleString()}</Text>
                </HStack>
              </Stack>
            </Box>
            <Button colorScheme="blue" size="lg" w="full" onClick={handleSubmit}>
              Agendar
            </Button>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CheckoutService;