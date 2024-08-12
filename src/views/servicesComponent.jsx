// ServicesComponent.js
import React from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ServiceCard from '../components/serviceCard';
import WorkshopCard from '../components/workshopCard';
import DividerText from '../components/dividerText';

const generalServices = [
  {
    title: 'Mantención Full',
    price: 35000,
    details: [
      'Limpieza y lubricación de rodamientos de mazas, motor y dirección',
      'Centrado de ruedas',
      'Limpieza de marco, ruedas y transmisión',
      'Cambio de piolas y fundas',
      'Ajuste de toda perdería con llave de torque',
      'Revisión estado y presión de neumáticos',
      'Sticker',
    ],
    note: 'Incluye: Garantía de 1 mes / 1 regulación posterior al servicio'
  },
  {
    title: 'Mantención Media',
    price: 25000,
    details: [
      'Limpieza de cuadro, ruedas y transmisión',
      'Limpieza y lubricación de rodamientos de dirección',
      'Regulación de frenos y cambios',
      'Cambio de hasta 2 piolas',
      'Revisión de estado y presión de neumáticos'
    ],
  },
  {
    title: 'Mantención Básica',
    price: 15000,
    details: [
      'Limpieza de cuadro, ruedas y transmisión',
      'Regulación de frenos y cambios',
      'Revisión de estado y presión de neumáticos'
    ],
  }
];

const specificServices = [
  {
    title: 'Mantención Fixie',
    price: 20000,
    details: [
      'Limpieza y lubricación de cuadro',
      'Limpieza y lubricación de rodamientos de maza, motor y dirección',
      'Centrado de ruedas',
      'Cambio de hasta 2 piolas',
      'Sticker'
    ],
  },
  {
    title: 'Mantención bicicleta de Triatlón',
    price: 55000,
    details: [
      'Limpieza y lubricación de rodamientos de mazas, motor y dirección',
      'Centrado de ruedas',
      'Limpieza de marco, ruedas y transmisión',
      'Cambio de piolas y fundas',
      'Ajuste de toda perdería con llave de torque',
      'Revisión estado y presión de neumáticos',
      'Sticker'
    ],
    note: 'Incluye: Garantía de 1 mes / 1 regulación posterior al servicio'
  }
];

const workshop = {
  title: 'Taller de Ciclismo Urbano',
  details: [
    'Modificación ley de convivencia de modos',
    'Tipos de bicicletas',
    'Averías comunes y cómo solucionarlas',
    'Accesorios y herramientas indispensables',
    'Tips',
    'Resuelve dudas como: ¿Qué tipo de bicicleta necesito? ¿Cada cuanto es necesario hacerle un mantenimiento? ¿Qué es un estudio biomecánica y cómo puede evitar o agravar lesiones?'
  ]
};

const ServicesComponent = () => {
  return (
    <Box p={4}>
      <DividerText title={"Servicios Generales"} />
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={12}>
        {generalServices.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </SimpleGrid>
      <DividerText title={"Mantenciones Específicas"}/>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {specificServices.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </SimpleGrid>
      <DividerText title={"Taller de Ciclismo Urbano"}/>
      <WorkshopCard workshop={workshop} />
    </Box>
  );
};

export default ServicesComponent;