// src/pages/Products.jsx
import {
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

import Product from '../components/product';

const productTemplates = [
  {
    image: 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
    brand: 'Brand A',
    title: 'Nice Chair, pink',
    price: 57,
    oldPrice: 199,
  },
  {
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    brand: 'Brand B',
    title: 'Modern Lamp',
    price: 45,
    oldPrice: 90,
  }
];

// Repite los productos 10 veces
const products = Array.from({ length: 10 }, (_, i) => productTemplates[i % productTemplates.length]);

function Products() {
  return (
    <Flex
      minH={'50vh'}
      align={'center'}
      justify={'center'}
      direction="column"
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Flex
        wrap="wrap"
        justify="center"
        maxW="1200px">
        {products.map((product, index) => (
          <Product
            key={index}
            image={product.image}
            brand={product.brand}
            title={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export default Products;
