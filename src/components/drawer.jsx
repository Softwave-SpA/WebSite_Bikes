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
    Input,
  } from '@chakra-ui/react'
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

export default function DrawerShop() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
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
              <Input placeholder='Aquí irán los productos...' />
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