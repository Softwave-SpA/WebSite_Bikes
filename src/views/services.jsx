import {
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import ServiceCard from '../components/serviceCard'; 
import DividerText from '../components/dividerText';
import services from '../assets/ej_services';
import Pricing from '../components/pricing';
  
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
			<Pricing />
			
			<Flex
				wrap="wrap"
				justify="center"
				maxW="1200px"
				style={{ gap: '20px' }}>
				{services.map((service, index) => (
				<ServiceCard
					key={index}
					name={service.name}
					price={service.price}
					description={service.description}
				/>
				))}
			</Flex>
		</Flex>
	);
}

export default Services;
