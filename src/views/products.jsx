import {
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

import Card from '../components/card';
import products from '../assets/ej_products';
import Divider from '../components/divider';

function Products() {
  return (
    <Flex
      minH={'50vh'}
      align={'center'}
      justify={'center'}
      direction="column"
      bg={useColorModeValue('#0000', 'gray.700')}
      py={5}>
      <Divider title="Productos"/>
      <Flex
        wrap="wrap"
        justify="center"
        maxW="1200px"
        style={{ gap: '20px' }}>
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
