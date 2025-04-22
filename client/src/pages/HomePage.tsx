import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Image,
  Flex,
  SimpleGrid,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import TimelinePopup from "../components/TimelinePopup";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const bgGradient = useColorModeValue(
    "linear(to-r, brand.secondaryOrange, brand.orange)",
    "linear(to-r, brand.secondaryOrange, brand.orange)"
  );

  return (
    <Box>
      {/* Timeline Popup */}
      <TimelinePopup />

      {/* Hero Section */}
      <Box
        bgImage={`url('${process.env.PUBLIC_URL}/images/hero-section-cover.png')`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        position="relative"
        height="500px"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0,0,0,0.4)"
        />
        <Container
          maxW="container.xl"
          position="relative"
          zIndex={1}
          height="100%"
        >
          <Flex
            direction="column"
            justify="center"
            align="center"
            textAlign="center"
            height="100%"
            color="white"
          >
            <Heading as="h1" size="2xl" mb={4}>
              ร่วมกำหนดอนาคต Thaipbs
            </Heading>
            <Text fontSize="xl" maxW="container.md" mb={8}>
              นี่ไม่ใช่แค่การเลือกผู้อำนวยการ
              นี่คือการกำหนดอนาคตของสื่อสาธารณะไทย
            </Text>
            <Button
              rightIcon={<ChevronRightIcon />}
              bg="brand.orange"
              color="white"
              _hover={{ bg: "brand.darkOrange" }}
              size="lg"
              onClick={() => navigate("/candidates")}
            >
              ดูรายชื่อผู้สมัคร
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxW="container.xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            transition="transform 0.3s ease"
            _hover={{ transform: "translateY(-5px)" }}
          >
            <Heading as="h3" size="md" mb={4} color="brand.secondaryOrange">
              ผู้สมัครทั้งหมด
            </Heading>
            <Text mb={4}>
              ศึกษาข้อมูลและประวัติของผู้สมัครที่ผ่านการคัดเลือกเข้าสู่รอบสุดท้ายในการเลือกผู้อำนวยการ
              Thai PBS
            </Text>
            <Button
              rightIcon={<ChevronRightIcon />}
              variant="outline"
              onClick={() => navigate("/candidates")}
            >
              ดูรายละเอียด
            </Button>
          </Box>

          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            transition="transform 0.3s ease"
            _hover={{ transform: "translateY(-5px)" }}
          >
            <Heading as="h3" size="md" mb={4} color="brand.secondaryOrange">
              แสดงความเห็น
            </Heading>
            <Text mb={4}>
              ร่วมแสดงความคิดเห็นและให้การสนับสนุนผู้สมัครที่คุณเห็นว่าเหมาะสมจะเป็นผู้อำนวยการคนใหม่
            </Text>
            <Button
              rightIcon={<ChevronRightIcon />}
              variant="outline"
              onClick={() => navigate("/candidates")}
            >
              เลือกผู้สมัครเพื่อให้ความเห็น
            </Button>
          </Box>

          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            transition="transform 0.3s ease"
            _hover={{ transform: "translateY(-5px)" }}
          >
            <Heading as="h3" size="md" mb={4} color="brand.secondaryOrange">
              สรุปความคิดเห็น
            </Heading>
            <Text mb={4}>
              ดูสรุปผลการแสดงความคิดเห็นของประชาชนต่อผู้สมัครแต่ละคนและข้อมูลเชิงสถิติ
            </Text>
            <Button
              rightIcon={<ChevronRightIcon />}
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              ดูผลสรุป
            </Button>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default HomePage;
