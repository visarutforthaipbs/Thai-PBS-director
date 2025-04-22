import React from "react";
import { Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Candidate } from "../types";

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const navigate = useNavigate();

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "lg",
      }}
    >
      <Image
        src={candidate.image}
        alt={candidate.name}
        height="250px"
        width="100%"
        objectFit="cover"
        fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2YxZjFmMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiM5OTkiPuC4o+C4ueC4m+C4oeC4ueC5ieC4quC4oeC4seC4hOC4ow08L3RleHQ+PC9zdmc+"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2} noOfLines={1}>
          {candidate.name}
        </Heading>

        <Button
          bg="brand.orange"
          color="white"
          _hover={{ bg: "brand.darkOrange" }}
          size="sm"
          width="full"
          mt={2}
          onClick={() => navigate(`/candidates/${candidate._id}`)}
        >
          ดูรายละเอียด
        </Button>
      </Box>
    </Box>
  );
};

export default CandidateCard;
