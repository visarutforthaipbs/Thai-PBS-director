import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Heading,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";
import { getCandidates } from "../api";
import { Candidate } from "../types";
import CandidateCard from "../components/CandidateCard";

const CandidateListPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidates();
        setCandidates(data);
        setLoading(false);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลผู้สมัครได้ กรุณาลองใหม่อีกครั้ง");
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.orange" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h1" mb={8} textAlign="center" color="brand.orange">
        รายชื่อผู้สมัคร
      </Heading>

      <Grid
        templateColumns={["1fr", "1fr 1fr", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
        gap={6}
      >
        {candidates.map((candidate) => (
          <CandidateCard key={candidate._id} candidate={candidate} />
        ))}
      </Grid>
    </Container>
  );
};

export default CandidateListPage;
