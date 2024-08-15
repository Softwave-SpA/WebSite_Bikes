import {
	Box,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import DividerText from '../components/dividerText';
import generalServices from '../assets/generalServices';
import specificServices from '../assets/specificServices';
import PricingCard from '../components/pricingCard';
import WorkshopCard from '../components/workshopCard';
import { SimpleGrid } from '@chakra-ui/react';

function Services() {
	return (
		<Flex
			minH={'50vh'}
			align={'center'}
			justify={'center'}
			direction="column"
			bg={useColorModeValue('#0000', '#0000')}
			py={10}>	
			<DividerText 
				title={"Servicios de Mantención"} 
				subtitle={"Selecciona el plan que mejor se adapte a tus necesidades"}
			/>
			<Box maxW="7xl" py="10" mx="auto">
				<SimpleGrid columns={[1, , , 3]} gap={[16, 8]}>
					{generalServices.map((service, index) => (
					<PricingCard
						key={index}
						title={service.title}
						price={service.price}
						features={service.features}
					/>
					))}
					
				</SimpleGrid>
			</Box>
			<DividerText title={"Mantenciones Específicas"}/>
			<Box maxW="5xl" py="10" mx="auto">
				<SimpleGrid columns={[1, 2]} gap={[16, 8]}>
					{specificServices.map((service, index) => (
					<PricingCard
						key={index}
						title={service.title}
						price={service.price}
						features={service.features}
					/>
					))}
				</SimpleGrid>
			</Box>
			<DividerText title={"Taller de Ciclismo"}/>
			<Box maxW="3xl" py="10" mx="auto">
				<WorkshopCard/>
			</Box>
		</Flex>
	);
}

export default Services;
