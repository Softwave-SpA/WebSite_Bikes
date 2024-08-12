// WorkshopCard.js
import React from 'react';
import { Box, Heading, List, ListItem } from '@chakra-ui/react';

const WorkshopCard = ({ workshop }) => {
  return (
    <Box borderWidth={1} borderRadius="md" p={4} shadow="md">
      <Heading as="h3" size="md" mb={4}>{workshop.title}</Heading>
      <List spacing={2}>
        {workshop.details.map((detail, index) => (
          <ListItem key={index}>{detail}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WorkshopCard;
