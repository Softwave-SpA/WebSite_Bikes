import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Stack,
  useToast,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "Mantención: Básica",
    comentarios: "",
    imagenes: null,
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('correo', formData.correo);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('asunto', formData.asunto);
      formDataToSend.append('comentarios', formData.comentarios);
  
      await axios.post('http://localhost:3000/server/email/contact', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: "Formulario enviado",
        description: "Nos pondremos en contacto contigo pronto.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      toast({
        title: "Error",
        description: "Ocurrió un problema al enviar el formulario.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="600px" mx="auto" p={6} boxShadow="md" rounded="md">
      <Heading size='lg' color={useColorModeValue('#2D284A', 'gray.800')}>Formulario de Contacto</Heading>
      <form onSubmit={handleSubmit}>
        <Stack py='5' spacing={4}>
          <FormControl id="nombre" isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="correo" isRequired>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              type="email"
              name="correo"
              placeholder="Tu correo"
              value={formData.correo}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="telefono" isRequired>
            <FormLabel>Teléfono</FormLabel>
            <Input
              type="tel"
              name="telefono"
              placeholder="Tu teléfono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="asunto" isRequired>
            <FormLabel>Asunto</FormLabel>
            <Select
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
            >
              <option>Mantención Básica</option>
              <option>Mantención Media</option>
              <option>Mantención Full</option>
              <option>Mantención Fixie</option>
              <option>Mantención Triatlón</option>
              <option>Compra de Productos</option>
              <option>Evaluación</option>
              <option>Consulta</option>
              <option>Otros</option>
            </Select>
          </FormControl>

          <FormControl id="comentarios">
            <FormLabel>Comentarios</FormLabel>
            <Textarea
              name="comentarios"
              value={formData.comentarios}
              onChange={handleChange}
              placeholder="Escribe aquí tus comentarios"
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg" w="full">
            Enviar
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ContactForm;
