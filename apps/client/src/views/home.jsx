import {
  Flex,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';

import CaptionCarousel from '../components/carrusel.jsx';
import Card from '../components/card.jsx';
import products from '../assets/ej_products.jsx';
import DividerBar from '../components/dividerBar.jsx';

function Home() {
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
      >
        <DividerBar title="Productos Destacados" />
        <Flex
          wrap="wrap"
          justify="center"
          maxW="1200px"
          style={{ gap: '20px' }}
        >
          {products.slice(0, 3).map((product) => (
            <Card
              key={product.id}
              image={product.image}
              brand={product.brand}
              title={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              productId={product.id}
            />
          ))}
        </Flex>
        <DividerBar title="Servicios Integrales" />
      </Flex>
    </>
  );
}

export default Home;
