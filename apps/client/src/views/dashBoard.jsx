import React from 'react';
import {
    Box,
    useColorModeValue,
} from '@chakra-ui/react';
import ProductTable from '../components/productTable'; // Asegúrate de importar la tabla de productos

export default function Dashboard() {
  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <Box as="section" bg="gray.50" minH="80vh">
        <Box as="main" p="4">
          <Box mt={4} maxW="1000px" mx="auto" boxShadow="md" rounded="md">
            <ProductTable />
        </Box>
      </Box>
    </Box>
  );
};