import {
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

import CaptionCarousel from '../components/carrusel.jsx';

function HeroTemplates() {
  return (
    <Flex
      minH={'50vh'}
      align={'center'}
      justify={'center'}
      direction="column" // Alinea todo en una sola columna
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <CaptionCarousel width="100%" /> {/* Carrusel ocupando todo el ancho */}
    </Flex>
  );
}

export default HeroTemplates;