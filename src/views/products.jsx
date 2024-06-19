import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Flex,
    useColorModeValue,
    Text,
    Box,
  } from '@chakra-ui/react';
  
  import Product from '../components/product.jsx';
  
  function Products() {
    return (
      <Flex
        minH={'50vh'}
        align={'center'}
        justify={'center'}
        direction="column" // Alinea todo en una sola columna
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Product />
      </Flex>
    );
  }
  
  export default Products;