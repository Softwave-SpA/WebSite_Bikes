import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup,
  IconButton,
  Input,
  Spinner,
  Flex,
  Heading,
  useToast,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import ProductForm from './productForm';
import ProductEditForm from './productEditForm';
import { BsBoxArrowUpRight, BsFillTrashFill, BsArrowUp, BsArrowDown } from "react-icons/bs";
import axios from 'axios';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: ''});
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const toast = useToast();

  const header = [
    { label: "Imagen", key: "" },
    { label: "Nombre", key: "nombre" },
    { label: "Categoria", key: "categoria" },
    { label: "Stock", key: "stock" },
    { label: "Precio", key: "precio" },
    { label: "Acciones", key: "" },
  ];

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://200.35.159.55/server/products');
      if (Array.isArray(response.data)) {
        setProducts(response.data);
        setFilteredProducts(response.data);
      } else {
        console.error("La respuesta no es un array:", response.data);
        setProducts([]); // Asegúrate de que products sea un array vacío
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "No se pudieron obtener los productos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://200.35.159.55/server/products/${id}`);
      toast({
        title: 'Producto eliminado',
        description: 'El producto ha sido eliminado correctamente.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el producto.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleClose = () => {
    setIsCreating(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredProducts].sort((a, b) => {
      const valueA = key === 'id' ? a[key] : String(a[key]).toLowerCase();
      const valueB = key === 'id' ? b[key] : String(b[key]).toLowerCase();

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredProducts([...sorted]);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={4}
      shadow="md"
      _dark={{
        bg: 'gray.800',
      }}
    >
      <Flex
        as="header"
        align="center"
        justify="space-between"
        w="full"
        px="4"
        bg="white"
        borderBottomWidth="1px"
        h="14"
      >
        { isCreating && (
          <Modal isOpen={isCreating} onClose={handleClose} size="4xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Crea un Producto</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <ProductForm onProductUpdated={handleClose}/>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
        {editingProduct && (
          <Modal isOpen={editingProduct} onClose={handleClose} size="4xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edita un Producto</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <ProductEditForm 
                  product={editingProduct} 
                  onProductUpdated={handleClose}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
        <Heading as="h5" size="lg" mb={4}>
          Lista de Productos
        </Heading>
        <Flex gap={6} alignItems="center">
          <Input
            placeholder="Buscar por nombre o código..."
            value={searchTerm}
            onChange={handleSearch}
            w="300px"
          /> 
          <Button
            colorScheme="blue"
            onClick={() => setIsCreating(true)}
            mr={6}
          >
            Crear Producto
          </Button>
        </Flex>   
      </Flex>
      <Table w="full" >
        <Thead>
          <Tr>
            {header.map(({ label, key }) => (
              <Th key={key}>
                <Flex align="center">
                  {label}
                  {key && (
                    <IconButton
                      icon={
                        sortConfig.key === key && sortConfig.direction === 'asc' ? (
                          <BsArrowUp />
                        ) : (
                          <BsArrowDown />
                        )
                      }
                      size="xs"
                      ml={2}
                      onClick={() => handleSort(key)}
                      aria-label={`Ordenar por ${label}`}
                    />
                  )}
                </Flex>
              </Th>
            ))}
          </Tr>        
        </Thead>
        <Tbody>
          {filteredProducts.map((product) => (
            <Tr key={product._id}>
              <Td>
                <Image
                  src={`http://200.35.159.55/uploads/${product.imagen}`}
                  alt={product.nombre}
                  boxSize="100px"
                  objectFit="cover"
                />
              </Td>
              <Td>{product.nombre}</Td>
              <Td>{product.categoria}</Td>
              <Td>{product.stock}</Td>
              <Td>${product.precio}</Td>
              <Td>
                <ButtonGroup variant="solid" size="sm" spacing={3}>
                  <IconButton
                    icon={<BsBoxArrowUpRight />}
                    colorScheme="blue"
                    onClick={() => handleEdit(product)}
                    aria-label="Editar producto"
                  />
                  <IconButton
                    icon={<BsFillTrashFill />}
                    colorScheme="red"
                    onClick={() => handleDelete(product._id)}
                    aria-label="Eliminar producto"
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProductTable;
