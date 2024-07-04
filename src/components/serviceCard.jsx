import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  } from '@chakra-ui/react';
  
  const ServiceCard = ({ name, price, description }) => {
    return (
      <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="flex-start"
      width="100%"
      py={4}
      px={6}
      borderBottom="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Stack spacing={2} width={{ base: '100%', md: '70%' }}>
        <Heading fontSize="lg" fontWeight={600}>
          {name}
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
          {description}
        </Text>
      </Stack>
      <Text fontWeight={800} fontSize="lg" color="#2D284A" mt={{ base: 4, md: 0 }} textAlign={{ base: 'left', md: 'right' }}>
        ${price}
      </Text>
    </Flex>
  );
};
  
  export default ServiceCard;
  