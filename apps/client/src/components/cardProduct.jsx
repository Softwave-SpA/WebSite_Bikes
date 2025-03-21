import {
    Flex,
    Box,
    Image,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
    Center
  } from '@chakra-ui/react';
import CartModal from '../components/cartModal';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import { useState } from 'react';

function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const productDetailPath = `/products/${product._id}`;

  const addToCart = () => {
    if (quantity > product.stock) {
      toast({
        title: "Stock insuficiente",
        description: `No hay suficiente stock para ${product.nombre}. Stock disponible: ${product.stock}`,
        status: "error",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);

    if (existingProductIndex !== -1) {
      const totalQuantity = cart[existingProductIndex].quantity + quantity;
      if (totalQuantity > product.stock) {
        toast({
          title: "Stock insuficiente",
          description: `No hay suficiente stock para ${product.nombre}. Stock disponible: ${product.stock}`,
          status: "error",
          duration: 2500,
          isClosable: true,
        });
        return;
      }
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    toast({
      title: "Producto añadido",
      description: `Se ha añadido ${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} de ${product.nombre} al carrito.`,
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };

  return (
    <Center py={10}>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        width={320}
      >
      <Link to={productDetailPath}>
        <Image
          src={`${API_URL}/uploads/${product.imagen}`}
          alt={`Imagen de ${product.nombre}`}
          roundedTop="lg"
          objectFit="cover"
            boxSize="100%"
            height={'230px'}
          mt={-12}
        />
      </Link>
        <Box p="5">
          <Flex mt="1" justifyContent="space-between" alignItems="center">
            <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              >
              {product.nombre}
            </Box>
            <Tooltip
              label="Añadir al carrito"
              bg="white"
              placement={'top'}
              color={'gray.800'}
              fontSize={'1.2em'}
            >
            <chakra.a href={'#'} display={'flex'}>
              <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} onClick={addToCart}/>
            </chakra.a>
            </Tooltip>
          </Flex>

          <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
            ${product.precio}
          </Box>
        </Box>
      </Box>
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Center>
  );
}

export default ProductCard;
  