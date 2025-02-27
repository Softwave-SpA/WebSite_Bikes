import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  useColorModeValue,
  VStack,
  Text,
  Box,
  HStack,
  IconButton
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

export default function DrawerShop() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Hook para redirección

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, [isOpen]);

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Redirigir a la página de checkout al hacer clic en "Guardar"
  const handleSave = () => {
    navigate('/checkout'); // Redirige a /checkout
    onClose();
  };

  return (
    <>
      <Button
        ref={btnRef}
        color={useColorModeValue('#2D284A', '#BEBDC0')}
        bg={useColorModeValue('#BEBDC0', '#2D284A')}
        onClick={onOpen}
        leftIcon={<FaShoppingCart />}
      >
        Carrito
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Carrito de Compras</DrawerHeader>

          <DrawerBody>
            {cartItems.length === 0 ? (
              <Text>No hay productos en el carrito.</Text>
            ) : (
              <VStack spacing={4}>
                {cartItems.map((item, index) => (
                  <Box key={index} p={4} borderWidth='1px' borderRadius='lg' w='100%'>
                    <HStack justifyContent="space-between">
                      <Box>
                        <Text fontWeight='bold'>{item.nombre}</Text>
                        <Text>Cantidad: {item.quantity}</Text>
                        <Text>Total: ${item.precio * item.quantity}</Text>
                      </Box>
                      <IconButton
                        aria-label='Eliminar artículo'
                        icon={<FaTrash />}
                        onClick={() => removeFromCart(index)}
                      />
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              bg={useColorModeValue('#2D284A', '#BEBDC0')}
              color={useColorModeValue('#BEBDC0', '#2D284A')}
              _hover={{ bg: '#1C6FEB' }} // Color de hover
              onClick={handleSave} // Llamar a la función de redirección
            >
              Comprar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
