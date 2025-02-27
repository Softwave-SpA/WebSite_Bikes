import {
  Container,
  Box,
  SimpleGrid
} from '@chakra-ui/react'
import ContactForm from '../components/contactForm';
import ContactInfo from '../components/contactInfo';
import DividerText from '../components/dividerText';

export default function Contact() {
  return (
    <Container bg="white" maxW="full" mt={0} centerContent overflow="hidden">
      <Box py={10}>
        <DividerText 
          title={"¡Agendemos Ahora mismo!"} 
          subtitle={"Una vez identificado el servicio que necesitas para tu bicicleta, contáctanos y te responderemos a la brevedad."}
        />
        <SimpleGrid py={10} columns={[1, , 2]} gap={[16, 8]} alignItems="start">
          <ContactForm />
          <ContactInfo />
        </SimpleGrid>
      </Box>
    </Container>
  )
}
