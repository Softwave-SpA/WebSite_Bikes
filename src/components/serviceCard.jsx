import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
  } from '@chakra-ui/react';
  
  const ServiceCard = ({ name, price, description }) => {
    return (
      <Center py={6} width={{ base: '100%', sm: '80%', md: '45%', lg: '30%' }}>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Stack pt={10} align={'center'}>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              {name}
            </Heading>
            <Text fontWeight={800} fontSize={'xl'} color={'teal.500'}>
              ${price}
            </Text>
            <Text color={'gray.500'} fontSize={'sm'} textAlign={'center'}>
              {description}
            </Text>
          </Stack>
        </Box>
      </Center>
    );
  };
  
  export default ServiceCard;
  