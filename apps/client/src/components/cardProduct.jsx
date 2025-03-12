import { useState } from 'react';
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
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const productDetailPath = `/products/${product._id}`;

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
          src={`http://200.35.159.55/uploads/${product.imagen}`}
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
              <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'}/>
            </chakra.a>
            </Tooltip>
          </Flex>

          <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
            ${product.precio}
          </Box>
        </Box>
      </Box>
    </Center>
  );
}

export default ProductCard;
  