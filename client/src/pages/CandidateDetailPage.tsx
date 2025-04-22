import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Spinner,
  Center,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { getCandidate } from "../api";
import { Candidate } from "../types";

const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!id) return;

      try {
        const data = await getCandidate(id);
        setCandidate(data);
        setLoading(false);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลผู้สมัครได้ กรุณาลองใหม่อีกครั้ง");
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.orange" />
      </Center>
    );
  }

  if (error || !candidate) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error || "ไม่พบข้อมูลผู้สมัคร"}</Text>
      </Center>
    );
  }

  return (
    <Container maxW="container.lg" py={10}>
      <Box mb={6}>
        <Button
          variant="outline"
          onClick={() => navigate("/candidates")}
          mb={6}
        >
          ย้อนกลับ
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        bg="white"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
      >
        <Box width={{ base: "100%", md: "300px" }} flexShrink={0}>
          <Image
            src={candidate.image}
            alt={candidate.name}
            width="100%"
            height={{ base: "300px", md: "100%" }}
            objectFit="cover"
            fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YxZjFmMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiM5OTkiPuC4o+C4ueC4m+C4oeC4ueC5ieC4quC4oeC4seC4hOC4ow08L3RleHQ+PC9zdmc+"
          />
        </Box>

        <Box p={6} flex="1">
          <Heading as="h1" size="xl" color="brand.orange" mb={4}>
            {candidate.name}
          </Heading>

          <Divider my={4} />

          <Box mb={6}>
            <Heading as="h2" size="md" mb={3} color="brand.gray">
              ประวัติการศึกษา
            </Heading>
            <Box as="ul" mt={4}>
              {candidate.education.map((edu, index) => (
                <Box as="li" display="flex" key={index} mb={2}>
                  <Icon
                    as={ChevronRightIcon}
                    color="brand.orange"
                    mt={1}
                    mr={2}
                  />
                  <Text>{edu}</Text>
                </Box>
              ))}
            </Box>
          </Box>

          <Box mb={6}>
            <Heading as="h2" size="md" mb={3} color="brand.gray">
              ประสบการณ์ทำงาน
            </Heading>
            <Box as="ul" mt={4}>
              {candidate.experience.map((exp, index) => (
                <Box as="li" display="flex" key={index} mb={2}>
                  <Icon
                    as={ChevronRightIcon}
                    color="brand.orange"
                    mt={1}
                    mr={2}
                  />
                  <Text>{exp}</Text>
                </Box>
              ))}
            </Box>
          </Box>

          <Box mb={6}>
            <Heading as="h2" size="md" mb={3} color="brand.gray">
              ผลงานและความสำเร็จ
            </Heading>
            <Box as="ul" mt={4}>
              {candidate.achievements.map((achievement, index) => (
                <Box as="li" display="flex" key={index} mb={2}>
                  <Icon
                    as={ChevronRightIcon}
                    color="brand.orange"
                    mt={1}
                    mr={2}
                  />
                  <Text>{achievement}</Text>
                </Box>
              ))}
            </Box>
          </Box>

          <Button
            bg="brand.orange"
            color="white"
            _hover={{ bg: "brand.darkOrange" }}
            mt={6}
            onClick={() => navigate(`/opinion/${id}`)}
          >
            แสดงความคิดเห็นต่อผู้สมัครคนนี้
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CandidateDetailPage;
