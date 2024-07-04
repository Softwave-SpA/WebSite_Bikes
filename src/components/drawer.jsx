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
  Box
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

export default function DrawerShop() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, [isOpen]);

  return (
    <>
      <Button
        ref={btnRef}
        color={useColorModeValue('#2D284A', '#BEBDC0')}
        bg={useColorModeValue('#BEBDC0', '#2D284A')}
        onClick={onOpen}
        leftIcon={<FaShoppingCart />}>
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
                    <Text fontWeight='bold'>{item.name}</Text>
                    <Text>${item.price}</Text>
                  </Box>
                ))}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Guardar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
