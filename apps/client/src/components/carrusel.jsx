import React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import accesorio_photo from '../assets/accesorio_bicicleta.jpg';
import bicicleta_photo from '../assets/imagen_bicicleta.jpg';
import reparacion_photo from '../assets/reparacion_bicicleta.jpg';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CaptionCarousel() {
  const [slider, setSlider] = React.useState();

  // Posiciones ajustadas para flechas
  const top = useBreakpointValue({ base: '50%', md: '50%' });
  const side = useBreakpointValue({ base: '5px', md: '40px' });

  const carouselHeight = useBreakpointValue({ base: '300px', md: '475px' });

  const cards = [
    {
      title: 'Equipamiento y Accesorios Esenciales para Ciclistas',
      text: '',
      color: 'Black',
      color_oposite: 'White',
      image: accesorio_photo,
    },    
    {
      title: 'Mantencion y reparacion de bicicletas',
      text: '',
      color: 'Black',
      color_oposite: 'White',
      image: reparacion_photo,
    },
    {
      title: 'Descubre tu Bicicleta ideal',
      text: '',
      color: 'Black',
      color_oposite: 'White',
      image: bicicleta_photo,
    },
  ];

  return (
    <>
      <Box position={'relative'} height={carouselHeight} width="100%" overflow={'hidden'}>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Flecha izquierda */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="30px" />
        </IconButton>
        {/* Flecha derecha */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size="30px" />
        </IconButton>
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((card, index) => (
            <Box
              key={index}
              height={carouselHeight}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${card.image})`}
            >
              <Container
                size="container.lg"
                height="100%"
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Stack
                  spacing={4}
                  w={'full'}
                  maxW={{ base: '90%', md: 'lg' }}
                  textAlign="center"
                  color={card.color_oposite}
                  bg="rgba(0, 0, 0, 0.5)" // Fondo semitransparente
                  borderRadius="md"
                  p={4}
                >
                  <Heading
                    fontSize={{ base: '2xl', md: '4xl' }}
                    style={{
                      textShadow: '2px 2px 4px black',
                    }}
                  >
                    {card.title}
                  </Heading>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>{card.text}</Text>
                </Stack>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
}
