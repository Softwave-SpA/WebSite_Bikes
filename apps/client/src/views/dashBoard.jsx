import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import ProductTable from '../components/productTable'; 

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  }, []);

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