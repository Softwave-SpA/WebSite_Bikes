import {
  Flex,
  useColorModeValue,
  Box,
  SimpleGrid,
} from '@chakra-ui/react';

import CaptionCarousel from '../components/carrusel.jsx';
import Card from '../components/card.jsx';
import products from '../assets/ej_products.jsx';
import DividerBar from '../components/dividerBar.jsx';
import generalServices from '../assets/generalServices.jsx';
import PricingCard from '../components/pricingCard.jsx';

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
              // brand={product.brand}
              title={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              productId={product.id}
            />
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
