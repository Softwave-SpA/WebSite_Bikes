import {
    Flex,
    useColorModeValue,
  } from '@chakra-ui/react';
  import ServiceCard from '../components/serviceCard'; 
  import DividerBar from '../components/dividerBar';
  import services from '../assets/ej_services';
  import Pricing from '../components/pricing';
    
  function Services() {
      return (
          <Flex
              minH={'50vh'}
              align={'center'}
              justify={'center'}
              direction="column"
              bg={useColorModeValue('#0000', '#0000')}>
          </Flex>
      );
  }
  
  export default Services;
  