import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  SimpleGrid
} from '@chakra-ui/react'
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md'
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs'
import ContactForm from '../components/contactForm';
import ContactInfo from '../components/contactInfo';
import DividerText from '../components/dividerText';

export default function Contact() {
  return (
    <Container bg="white" maxW="full" mt={0} centerContent overflow="hidden">
      <Box>
        <DividerText 
          title={"¡Agendemos Ahora mismo!"} 
          subtitle={"Una vez identificado el servicio que necesitas para tu bicicleta, contáctanos y te responderemos a la brevedad."}
        />
        <SimpleGrid py='10' columns={[1, , 2]} gap={[16, 8]} alignItems="start">
          <ContactForm />
          <ContactInfo />
        </SimpleGrid>
      </Box>

      <Flex justify="center" mt={10}>
        <Box
          bg="#2D284A"
          color="#BEBDC0"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
          w="full" // Asegura que ocupe el 100% del ancho disponible
          maxW="7xl" // Limita el tamaño máximo en pantallas grandes
        >
          <Box p={4}>
            <Wrap spacing={{ base: 10, sm: 3, md: 5, lg: 20 }} justify="center">
              <WrapItem>
                <Box>
                  <Heading textAlign="center">Contacto</Heading>
                  <Text mt={3} color="#BEBDC0" textAlign="center">
                    Llena el formulario con tus datos
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }} textAlign="center">
                    <VStack spacing={4} align="center">
                      <Button
                        size="md"
                        height="48px"
                        width="auto"
                        variant="ghost"
                        color="#BEBDC0"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}
                      >
                        +56 9 1234 5678
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="auto"
                        variant="ghost"
                        color="#BEBDC0"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}
                      >
                        contacto@mail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="auto"
                        variant="ghost"
                        color="#BEBDC0"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
                      >
                        Peñalolén, Región Metropolitana
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    justify="center"
                  >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<MdFacebook size="28px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<BsDiscord size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>

              {/* Formulario de contacto */}
              <WrapItem>
                <Box bg="#585174" borderRadius="lg" w="full">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Tu nombre</FormLabel>
                        <InputGroup borderColor="black">
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800" />
                          </InputLeftElement>
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="email">
                        <FormLabel>Correo electrónico</FormLabel>
                        <InputGroup borderColor="black">
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail color="gray.800" />
                          </InputLeftElement>
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="message">
                        <FormLabel>Mensaje</FormLabel>
                        <Textarea
                          borderColor="black"
                          placeholder="Escribe tu mensaje..."
                        />
                      </FormControl>
                      <FormControl id="submit" float="right">
                        <Button variant="solid" bg="#2D284A" color="#BEBDC0" _hover={{}}>
                          Enviar mensaje
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  )
}
