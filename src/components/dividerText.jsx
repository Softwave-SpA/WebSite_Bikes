import React from 'react';
import { Stack, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const DividerText = ({ title, subtitle }) => {
  return (
    <Stack spacing={2} textAlign="center" >
        <Heading 
          as="h1" 
          fontSize="4xl" 
          color={useColorModeValue('#2D284A', 'gray.800')}>
          {title}
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          {subtitle}
        </Text>
    </Stack>
  );
};

export default DividerText;
