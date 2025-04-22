import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Center,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@chakra-ui/icons";

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.md" py={10}>
      <Center minH="70vh">
        <VStack spacing={6} textAlign="center">
          <Icon as={CheckCircleIcon} w={20} h={20} color="green.500" />

          <Heading as="h1" size="xl" color="brand.orange">
            ขอบคุณสำหรับความคิดเห็น
          </Heading>

          <Text fontSize="xl" maxW="md">
            ความคิดเห็นของคุณมีส่วนสำคัญในการช่วยให้กระบวนการสรรหาผู้อำนวยการ
            Thai PBS มีความโปร่งใสและมีส่วนร่วมจากประชาชน
          </Text>

          <Box pt={10}>
            <Button
              bg="brand.orange"
              color="white"
              _hover={{ bg: "brand.darkOrange" }}
              size="lg"
              mr={4}
              onClick={() => navigate("/dashboard")}
            >
              ดูความคิดเห็นทั้งหมด
            </Button>

            <Button
              variant="outline"
              borderColor="brand.orange"
              color="brand.orange"
              _hover={{ bg: "brand.orange", color: "white" }}
              size="lg"
              onClick={() => navigate("/")}
            >
              กลับหน้าหลัก
            </Button>
          </Box>
        </VStack>
      </Center>
    </Container>
  );
};

export default ThankYouPage;
