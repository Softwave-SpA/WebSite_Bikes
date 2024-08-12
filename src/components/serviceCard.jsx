// ServiceCard.js
import React from 'react';
import { Box, Heading, Text, List, ListItem, VStack, HStack, Icon, useBreakpointValue } from '@chakra-ui/react';
import { FaWrench, FaCog, FaTools } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
  let icon;
  switch (service.title) {
    case 'Mantención Full':
      icon = FaWrench;
      break;
    case 'Mantención Media':
      icon = FaCog;
      break;
    case 'Mantención Básica':
      icon = FaTools;
      break;
    case 'Mantención Fixie':
      icon = FaWrench;
      break;
    case 'Mantención bicicleta de Triatlón':
      icon = FaCog;
      break;
    default:
      icon = FaTools;
      break;
  }

  // Adjust padding and spacing based on screen size
  const padding = useBreakpointValue({ base: '4', sm: '6' });
  const spacing = useBreakpointValue({ base: '4', sm: '6' });

  return (
    <Box
      bg="white"
      shadow="md"
      borderRadius="md"
      borderWidth={1}
      overflow="hidden"
      _hover={{ shadow: 'lg', transform: 'scale(1.02)' }}
      transition="all 0.3s ease"
      p={padding}
      w={{ base: 'full', sm: '320px' }}
      mx="auto"
    >
      <HStack spacing={4} mb={4}>
        <Icon as={icon} color="teal.500" boxSize={8} />
        <VStack align="start" spacing={1}>
          <Heading as="h3" size="md">{service.title}</Heading>
          <Text fontSize="lg" fontWeight="bold">${service.price.toLocaleString()}</Text>
        </VStack>
      </HStack>
      <List spacing={2} mb={4}>
        {service.details.map((detail, index) => (
          <ListItem key={index}>
            {detail}
          </ListItem>
        ))}
      </List>
      {service.note && <Text fontStyle="italic" color="gray.500">{service.note}</Text>}
    </Box>
  );
};

export default ServiceCard;

