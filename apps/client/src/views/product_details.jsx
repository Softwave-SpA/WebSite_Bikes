import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  List,
  ListItem,
  Spinner,
  Input,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdLocalShipping, MdAddShoppingCart } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import CartModal from '../components/cartModal';
import axios from 'axios';

export default function ProductDetails() {
  // const product = products.find((product) => product.id.toString() === id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const toast = useToast();
  
  // Función para obtener los productos
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/server/products/${id}`);
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setProduct(response.data);
      } else {
        console.error("La respuesta no es un array:", response.data);
        setProduct([]); // Asegúrate de que products sea un array vacío
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "No se pudieron obtener los productos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar los productos al montar el componente
  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return <Text>Producto no encontrado</Text>;
  }

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...product, quantity });
    localStorage.setItem('cart', JSON.stringify(cart));
    setIsModalOpen(true);
  };

  // Mostrar spinner mientras se cargan los productos
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  // Parsear características si es un string
  const parseFeatures = (features) => {
    if (typeof features === 'string') {
      try {
        return JSON.parse(features); // Convierte el string a un array
      } catch (error) {
        console.error("Error parsing features:", error);
        return []; // Si hay un error, devuelve un array vacío
      }
    }
    return Array.isArray(features) ? features : []; // Si ya es un array, úsalo directamente
  };

  const features = parseFeatures(product.caracteristicas);

  return (
    <Container maxW={'6xl'} py={10}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
        {/* Imagen del producto */}
        <Flex justify="center">
          <Image
            rounded="lg"
            src={`http://localhost:3000/uploads/${product.imagen}`}
            alt={product.nombre}
            boxSize={{ base: '100%', sm: '400px', lg: '500px' }}
            objectFit="cover"
          />
        </Flex>

        {/* Detalles del producto */}
        <Stack spacing={6}>
          <Heading fontSize={{ base: '2xl', md: '4xl' }}>{product.nombre}</Heading>
          <Text fontSize="2xl" color={useColorModeValue('gray.800', 'gray.400')}>
            ${product.precio}
          </Text>

          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
            {product.descripcion || 'Este producto es de alta calidad y perfecto para ti.'}
          </Text>

          <Box>
            <Heading fontSize={{ base: 'xl', md: '2xl' }} mb={2}>Características</Heading>
            <List spacing={2}>
              <ListItem>
                <strong>Categoría:</strong> {product.categoria}
              </ListItem>
              {features.map((feature, index) => (
                <ListItem key={index}>
                  <strong>{feature.clave}:</strong> {feature.valor}
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Sección de cantidad y compra */}
          <Flex alignItems="center" gap={4}>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              width={20}
            />
            <Button
              leftIcon={<MdAddShoppingCart />}
              colorScheme="blue"
              size="lg"
              onClick={addToCart}
            >
              Añadir al carrito
            </Button>
          </Flex>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>Envío a coordinar con vendedor</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Container>
  );
}
