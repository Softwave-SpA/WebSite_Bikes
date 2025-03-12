import React, { useState } from "react";
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

const ProductForm = ({ onProductUpdated }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: null,
    stock: "",
    categoria: "Componentes",
    caracteristicas: [{ clave: "", valor: "" }],
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    const productData = new FormData();
    productData.append("nombre", formData.nombre);
    productData.append("precio", formData.precio);
    productData.append("descripcion", formData.descripcion);
    productData.append("stock", formData.stock);
    productData.append("categoria", formData.categoria);
    productData.append("imagen", formData.imagen);
    productData.append("caracteristicas", JSON.stringify(formData.caracteristicas));

    try {
      const response = await axios.post("http://200.35.159.55/server/products", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      toast({
        title: "Producto guardado",
        description: "El producto se ha guardado exitosamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log(response.data);
      onProductUpdated(formData);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al guardar producto",
        description: "Hubo un problema al guardar el producto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        {/* Primera línea: Nombre e Imagen */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl id="nombre" isRequired>
              <FormLabel>Nombre del Producto</FormLabel>
              <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="imagen" isRequired>
              <FormLabel>Imagen del Producto</FormLabel>
              <Input type="file" name="imagen" onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })} />
            </FormControl>
          </GridItem>
        </Grid>

        {/* Segunda línea: Precio, Stock y Categoría */}
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem>
            <FormControl id="precio" isRequired>
              <FormLabel>Precio</FormLabel>
              <Input type="number" name="precio" value={formData.precio} onChange={handleChange} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="stock" isRequired>
              <FormLabel>Stock</FormLabel>
              <Input type="number" name="stock" value={formData.stock} onChange={handleChange} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="categoria" isRequired>
              <FormLabel>Categoría</FormLabel>
              <Select name="categoria" value={formData.categoria} onChange={handleChange}>
                {["Componentes", "Mantenimiento", "Protecciones", "Bicicletas", "Ropa y Calzado", "Herramientas", "Otros"].map((categoria) => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        </Grid>

        {/* Descripción */}
        <FormControl id="descripcion" isRequired>
          <FormLabel>Descripción</FormLabel>
          <Textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
        </FormControl>

        {/* Características */}
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

        {/* Botón de Guardar */}
        <Button type="submit" colorScheme="blue">Guardar Producto</Button>
      </Stack>
    </form>
  );
};

export default ProductForm;
