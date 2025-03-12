import { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Select,
  Input,
  Button,
  useColorModeValue,
  Text,
  Grid,
  GridItem,
  VStack,
  Heading,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import DividerText from '../components/dividerText';
import ProductCard from '../components/cardProduct';
import axios from 'axios';

function Products() {
  // Hooks en el nivel superior
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const toast = useToast();

  // Función para obtener los productos
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://200.35.159.55:3000/server/products');
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error("La respuesta no es un array:", response.data);
        setProducts([]); // Asegúrate de que products sea un array vacío
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

  // Efecto para cargar los productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Obtener categorías únicas
  const categories = [...new Set(products.map((product) => product.categoria))];

  // Filtrar y ordenar productos
  const filteredProducts = products
    .filter((product) => (category ? product.categoria === category : true))
    .filter((product) => product.nombre.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc':
          return a.precio - b.precio;
        case 'priceDesc':
          return b.precio - a.precio;
        case 'nameAsc':
          return a.nombre.localeCompare(b.nombre);
        case 'nameDesc':
          return b.nombre.localeCompare(a.nombre);
        default:
          return 0;
      }
    });

  // Mostrar spinner mientras se cargan los productos
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Flex 
      minH={'50vh'}
      direction="column" 
      p={8}
      align="center" 
      py={10} 
      bg={useColorModeValue('#0000', 'gray.700')}
    >
      <DividerText 
        title="Productos" 
        subtitle="Explora nuestra selección de bicicletas y accesorios. Encuentra lo que necesitas para tu próxima aventura." 
      />
      
      <Grid templateColumns="250px 1fr" gap={6} maxW="1500px" w="100%" py="10">
        {/* Columna izquierda: Filtros y búsqueda */}
        <GridItem>
          <VStack align="start" spacing={4}>
            <Heading as="h3" size="md">Filtrar por</Heading>
            <Input
              placeholder="Buscar por nombre"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select placeholder="Filtrar por categoría" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
            {(category || search) && (
              <Button onClick={() => { setCategory(''); setSearch(''); }} w="100%">
                Eliminar filtro
              </Button>
            )}

            <Heading as="h3" size="md">Ordenar por</Heading>
            <Select placeholder="Ordenar por" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="priceAsc">Precio: Menor a Mayor</option>
              <option value="priceDesc">Precio: Mayor a Menor</option>
              <option value="nameAsc">Nombre: A - Z</option>
              <option value="nameDesc">Nombre: Z - A</option>
            </Select>
          </VStack>
        </GridItem>

        {/* Columna derecha: Productos */}
        <GridItem>
          <Flex wrap="wrap" justify="start" gap={5}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)
            ) : (
              <Text fontSize="xl" color="gray.500">No hay productos disponibles.</Text>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default Products;