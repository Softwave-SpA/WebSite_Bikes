// src/pages/Products.jsx
import {
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

import Card from '../components/card';
import products from '../assets/ej_products';

function Products() {
  return (
    <Flex
      minH={'50vh'}
      align={'center'}
      justify={'center'}
      direction="column"
      bg={useColorModeValue('gray.300', 'gray.700')}>
      <Flex
        wrap="wrap"
        justify="center"
        maxW="1200px">
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            brand={product.brand}
            title={product.name}
            price={product.price}
            oldPrice={product.oldPrice}
            productId={product.id}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export default Products;
