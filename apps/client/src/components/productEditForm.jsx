import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";

const ProductEditForm = ({ product, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: null,
    stock: "",
    categoria: "Componentes",
    caracteristicas: [],
  });

  const toast = useToast();

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || "",
        precio: product.precio || "",
        descripcion: product.descripcion || "",
        imagen: product.imagen,
        stock: product.stock || "",
        categoria: product.categoria || "Componentes",
        caracteristicas: typeof product.caracteristicas === "string"
          ? JSON.parse(product.caracteristicas) // Convierte la cadena JSON a un array
          : Array.isArray(product.caracteristicas)
          ? product.caracteristicas
          : [], // Asegurar que siempre sea un array
      });
    }
  }, [product]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaracteristicaChange = (index, e) => {
    const { name, value } = e.target;
    const newCaracteristicas = [...formData.caracteristicas];
    newCaracteristicas[index][name] = value;
    setFormData({ ...formData, caracteristicas: newCaracteristicas });
  };

  const addCaracteristica = () => {
    setFormData({
      ...formData,
      caracteristicas: [...formData.caracteristicas, { clave: "", valor: "" }],
    });
  };

  const removeCaracteristica = (index) => {
    const newCaracteristicas = formData.caracteristicas.filter((_, i) => i !== index);
    setFormData({ ...formData, caracteristicas: newCaracteristicas });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/server/products/${product._id}`, formData);

      toast({
        title: "Producto actualizado",
        description: "El producto se ha actualizado exitosamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onProductUpdated(formData);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al actualizar producto",
        description: "Hubo un problema al actualizar el producto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Nombre del Producto</FormLabel>
              <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Imagen del Producto</FormLabel>
              <Input type="file" name="imagen" onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })} />
            </FormControl>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Precio</FormLabel>
              <Input type="number" name="precio" value={formData.precio} onChange={handleChange} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Stock</FormLabel>
              <Input type="number" name="stock" value={formData.stock} onChange={handleChange} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Categoría</FormLabel>
              <Select name="categoria" value={formData.categoria} onChange={handleChange}>
                {["Componentes", "Mantenimiento", "Protecciones", "Bicicletas", "Ropa y Calzado", "Herramientas", "Otros"].map((categoria) => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        </Grid>

        <FormControl isRequired>
          <FormLabel>Descripción</FormLabel>
          <Textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
        </FormControl>

        <Box>
          <FormLabel>Características</FormLabel>
          {formData.caracteristicas.map((caracteristica, index) => (
            <Grid key={index} templateColumns="repeat(3, 1fr)" gap={4} alignItems="center">
              <GridItem>
                <Input name="clave" value={caracteristica.clave} onChange={(e) => handleCaracteristicaChange(index, e)} placeholder="Título de la característica" />
              </GridItem>
              <GridItem>
                <Input name="valor" value={caracteristica.valor} onChange={(e) => handleCaracteristicaChange(index, e)} placeholder="Descripción" />
              </GridItem>
              <GridItem>
                <Button colorScheme="red" onClick={() => removeCaracteristica(index)}>Eliminar</Button>
              </GridItem>
            </Grid>
          ))}
          <Button onClick={addCaracteristica} colorScheme="teal" mt={2}>Agregar Característica</Button>
        </Box>

        <Button type="submit" colorScheme="blue">Actualizar Producto</Button>
      </Stack>
    </form>
  );
};

export default ProductEditForm;
