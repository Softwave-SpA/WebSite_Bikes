import {
    Flex,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  import Card from '../components/card';
  import products from '../assets/ej_products';
  import Divider from '../components/divider';
  
  function Services() {
    return (
      <Flex
        minH={'50vh'}
        align={'center'}
        justify={'center'}
        direction="column"
        bg={useColorModeValue('#0000', 'gray.700')}
        py={5}>
        <Divider title="Servicios Integrales"/>
      </Flex>
    );
  }
  
  export default Services;
  