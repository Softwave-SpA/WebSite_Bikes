import React from 'react';
import {
    Avatar,
    Box,
    Flex,
    Icon,
    Text,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import ProductTable from '../components/productTable'; // Asegúrate de importar la tabla de productos
import ProductForm from '../components/productForm';  // Asegúrate de importar el formulario de productos
import { MdInventory } from 'react-icons/md';
import { useContext, useEffect, useState } from "react";
import Logo from "../assets/SprintPits_Letra.png";


export default function Dashboard() {
  const [showForm, setShowForm] = React.useState(false);
  const [selectedNav, setSelectedNav] = useState('');
  const color = useColorModeValue("gray.600", "gray.300");

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "gray.100",
          _dark: {
            bg: "gray.900",
          },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        onClick={() => setSelectedNav(children)}
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="5"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

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