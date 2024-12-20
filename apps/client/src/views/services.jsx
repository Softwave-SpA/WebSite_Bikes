import { useRef } from 'react';
import {
	Box,
	Flex,
	useColorModeValue,
	SimpleGrid
} from '@chakra-ui/react';
import DividerText from '../components/dividerText';
import generalServices from '../assets/generalServices';
import specificServices from '../assets/specificServices';
import PricingCard from '../components/pricingCard';
import WorkshopCard from '../components/workshopCard';
import ContactForm from '../components/contactForm';
import ContactInfo from '../components/contactInfo';

function Services() {
	const contactRef = useRef(null);

	const scrollToContact = () => {
		contactRef.current.scrollIntoView({ behavior: 'smooth' });
	};

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
				subtitleProps={{
					textAlign: 'center',
					maxW: '90%',
					mx: 'auto',
					wordBreak: 'break-word',
				}}
			/>
			<Box maxW="7xl" py="10" mx="auto" px={[4, 6, 8]}>
				<SimpleGrid
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
			<DividerText title={"Mantenciones Específicas"} />
			<Box maxW="5xl" py="10" mx="auto" px={[4, 6, 8]}>
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
			<DividerText title={"Taller de Ciclismo"} />
			<Box maxW="3xl" py="10" mx="auto" px={[4, 6, 8]}>
				<WorkshopCard />
			</Box>
			<Box maxW="5xl" py="5" mx="auto" px={[4, 6, 8]} ref={contactRef}>
				<DividerText
					title={"¡Agendemos Ahora mismo!"}
					subtitle={"Un vez identificado el servicio que necesitas para tu bicicleta, contáctanos y te responderemos a la brevedad."}
					subtitleProps={{
						textAlign: 'center',
						maxW: '90%',
						mx: 'auto',
						wordBreak: 'break-word',
					}}
				/>
				<SimpleGrid
					py="10"
					columns={[1, 1, 2]}
					gap={[8, 6, 8]}
					alignItems="start"
				>
					<ContactForm />
					<ContactInfo />
				</SimpleGrid>
			</Box>
		</Flex>
	);
}

export default Services;
