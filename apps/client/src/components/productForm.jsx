import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: null,
    stock: "",
    caracteristicas: [{ clave: "", valor: "" }], // Inicializa con una característica vacía
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el cambio en las características
  const handleCaracteristicaChange = (index, e) => {
    const { name, value } = e.target;
    const newCaracteristicas = [...formData.caracteristicas];
    newCaracteristicas[index][name] = value;
    setFormData({ ...formData, caracteristicas: newCaracteristicas });
  };

  // Agregar una nueva característica
  const addCaracteristica = () => {
    setFormData({
      ...formData,
      caracteristicas: [...formData.caracteristicas, { clave: "", valor: "" }],
    });
  };

  // Eliminar una característica
  const removeCaracteristica = (index) => {
    const newCaracteristicas = formData.caracteristicas.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, caracteristicas: newCaracteristicas });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí procesas el envío de datos
    console.log(formData);
  };

  return (
    <Box maxW="600px" mx="auto" p={6} boxShadow="md" rounded="md">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="nombre" isRequired>
            <FormLabel>Nombre del Producto</FormLabel>
            <Input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="precio" isRequired>
            <FormLabel>Precio</FormLabel>
            <Input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="descripcion" isRequired>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="imagen" isRequired>
            <FormLabel>Imagen del Producto</FormLabel>
            <Input
              type="file"
              name="imagen"
              onChange={(e) =>
                setFormData({ ...formData, imagen: e.target.files[0] })
              }
            />
          </FormControl>

          <FormControl id="stock" isRequired>
            <FormLabel>Stock</FormLabel>
            <Input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </FormControl>

          {/* Sección de Características */}
          {formData.caracteristicas.map((caracteristica, index) => (
            <Stack key={index} direction="row" align="center">
              <FormControl>
                <FormLabel>Clave</FormLabel>
                <Input
                  name="clave"
                  value={caracteristica.clave}
                  onChange={(e) => handleCaracteristicaChange(index, e)}
                  placeholder="Título de la característica"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Valor</FormLabel>
                <Input
                  name="valor"
                  value={caracteristica.valor}
                  onChange={(e) => handleCaracteristicaChange(index, e)}
                  placeholder="Descripción o valor"
                />
              </FormControl>
              <Button
                colorScheme="red"
                onClick={() => removeCaracteristica(index)}
              >
                Eliminar
              </Button>
            </Stack>
          ))}

          <Button onClick={addCaracteristica} colorScheme="teal">
            Agregar Característica
          </Button>

          <Button type="submit" colorScheme="blue">
            Guardar Producto
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ProductForm;
