import { useState } from 'react';
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
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdLocalShipping, MdAddShoppingCart } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import products from '../assets/ej_products2'; // Asegúrate de que 'ej_products' tenga el formato correcto
import CartModal from '../components/cartModal';

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((product) => product.id.toString() === id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <Text>Producto no encontrado</Text>;
  }

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...product, quantity });
    localStorage.setItem('cart', JSON.stringify(cart));
    setIsModalOpen(true);
  };

  return (
    <Container maxW={'6xl'} py={10}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
        {/* Imagen del producto */}
        <Flex justify="center">
          <Image
            rounded="lg"
            src={product.imagen} // Asegúrate de que el campo sea correcto
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
            <Text fontSize="lg" fontWeight="bold" mb={2}>Características:</Text>
            <List spacing={2}>
              {product.features?.map((feature, index) => (
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
