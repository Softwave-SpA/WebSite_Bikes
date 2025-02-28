import {
	Box,
	Flex,
	useColorModeValue,
	SimpleGrid
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import DividerText from '../components/dividerText';
import generalServices from '../assets/generalServices';
import specificServices from '../assets/specificServices';
import PricingCard from '../components/pricingCard';
import WorkshopCard from '../components/workshopCard';

function Services() {
  	const navigate = useNavigate();

	const scrollToContact = (service) => {
		navigate('/checkoutService', { state: { service: service.title } });
	  };

	return (
		<Flex
			minH={'50vh'}
			align={'center'}
			justify={'center'}
			direction="column"
			bg={useColorModeValue('#0000', '#0000')}
			py={10}
		>
			<Box maxW="7xl" mx="auto" px={[4, 6, 8]}>			
				<DividerText
					title={"Servicios de Mantención"}
					subtitle={"Selecciona el plan que mejor se adapte a tus necesidades"}
				/>
				<SimpleGrid
					py="1"
					columns={[1, 2, 3]}
					gap={[8, 6, 8]}
					alignItems="center"
					gridAutoRows={{ base: 'auto', md: '1fr' }} // Ajustar filas de igual altura en PC
				>
					{generalServices.map((service, index) => (
						<PricingCard
							key={index}
							title={service.title}
							price={service.price}
							features={service.features}
							onScheduleClick={scrollToContact}
						/>
					))}
				</SimpleGrid>
			</Box>
			<Box maxW="5xl" py="10" mx="auto" px={[4, 6, 8]}>
				<DividerText title={"Mantenciones Específicas"} />
				<SimpleGrid
					columns={[1, 1, 2]}
					gap={[8, 6, 8]}
					alignItems="center"
					gridAutoRows={{ base: 'auto', md: '1fr' }} // Igual ajuste para esta sección
				>
					{specificServices.map((service, index) => (
						<PricingCard
							key={index}
							title={service.title}
							price={service.price}
							features={service.features}
							onScheduleClick={scrollToContact}
						/>
					))}
				</SimpleGrid>
			</Box>
			
			<Box maxW="3xl" py="5" mx="auto" px={[4, 6, 8]}>
				<DividerText title={"Taller de Ciclismo"} />
				<WorkshopCard />
			</Box>
		</Flex>
	);
}

export default Services;
