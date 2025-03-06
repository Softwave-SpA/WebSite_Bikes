import {
  Flex,
  useColorModeValue,
  Box,
  SimpleGrid,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import CaptionCarousel from '../components/carrusel.jsx';
// import products from '../assets/ej_products2.jsx';
import DividerBar from '../components/dividerBar.jsx';
import generalServices from '../assets/generalServices.jsx';
import PricingCard from '../components/pricingCard.jsx';
import ProductCard from '../components/card2.jsx';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/server/products');
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <>
      <Box width="100vw" mx="0" px="0">
        <CaptionCarousel />
      </Box>

      <Flex
        align={'center'}
        justify={'center'}
        direction="column"
        bg={useColorModeValue('gray.50', 'gray.800')}
        px={{ base: 4, md: 8 }}
        py="10"
      >
        <DividerBar title="Productos Destacados" />
        <Flex
          wrap="wrap"
          justify="center"
          maxW="1200px"
          style={{ gap: '20px' }}
        >
          {products.slice(0, 3).map((product) => (
            <ProductCard product={product}/>
          ))}
        </Flex>
        <DividerBar title="Servicios Integrales" />
        <Box maxW="7xl" py="10" mx="auto" px={[4, 6, 8]}>
          <SimpleGrid
            columns={[1, 2, 3]}
            gap={[8, 6, 8]}
            alignItems="center"
            gridAutoRows={{ base: 'auto', md: '1fr' }} // Ajustar filas de igual altura en PC
          >
            {generalServices.map((service, index) => (
              <PricingCard
                key={index}
                title={service.title}
                price={service.price}
                features={service.features}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </>
  );
}

export default Home;
