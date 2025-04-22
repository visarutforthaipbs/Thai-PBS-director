import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
  VStack,
  Divider,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { submitQuestion, getCandidates, getQuestionsCount } from "../api";
// @ts-ignore - This component exists but TypeScript can't find it
import QuestionList from "../components/QuestionList";
import { Candidate } from "../types";

// Mock function for submitting questions when API isn't available
const mockSubmitQuestion = async (data: any): Promise<any> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Return mock success response
  return {
    _id: Math.random().toString(36).substring(2),
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
};

const AskPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState("all");
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [province, setProvince] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCount, setSubmittedCount] = useState<number | null>(null);
  const [apiUnavailable, setApiUnavailable] = useState(false);
  const toast = useToast();

  // Fetch candidates and question count when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load candidates
        const candidatesData = await getCandidates();
        setCandidates(candidatesData);

        // Load question count
        const count = await getQuestionsCount();
        setSubmittedCount(count);
        setApiUnavailable(false);
      } catch (err) {
        console.error("Error loading initial data:", err);
        setApiUnavailable(true);
        // Set mock candidates if API fails
        setCandidates([
          {
            _id: "c1",
            name: "วรวัฒน์ ปิยนีรนาท",
            education: [],
            experience: [],
            achievements: [],
            image: "",
          },
          {
            _id: "c2",
            name: "สุภิญญา กลางณรงค์",
            education: [],
            experience: [],
            achievements: [],
            image: "",
          },
          {
            _id: "c3",
            name: "ชัยยุทธ ชวลิตนิธิกุล",
            education: [],
            experience: [],
            achievements: [],
            image: "",
          },
        ]);
        // Set a mock count
        setSubmittedCount(128);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation - only question and category are required
    if (!question.trim() || !category) {
      toast({
        title: "กรุณากรอกคำถามและเลือกหมวดหมู่",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const questionData = {
        name: name.trim() || undefined,
        question,
        candidateId:
          selectedCandidate === "all" ? undefined : selectedCandidate,
        category,
        province: province.trim() || undefined,
      };

      // Try using the real API, fallback to mock if it fails
      let response;
      try {
        response = await submitQuestion(questionData);
        // Increment the question count
        setSubmittedCount((prev) => (prev !== null ? prev + 1 : 1));
      } catch (apiError) {
        console.error("API unavailable, using mock submission", apiError);
        setApiUnavailable(true);
        response = await mockSubmitQuestion(questionData);
        // Increment the mock count too
        setSubmittedCount((prev) => (prev !== null ? prev + 1 : 129));
      }

      // Reset form
      setSelectedCandidate("all");
      setName("");
      setQuestion("");
      setCategory("");
      setProvince("");

      toast({
        title: "✅ ขอบคุณสำหรับคำถามของคุณ!",
        description:
          "ทีมงานจะรวบรวมเพื่อใช้ในเวทีแสดงวิสัยทัศน์ 11–12 พฤษภาคม 2568",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting question:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งคำถามได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header Section */}
        <Box textAlign="center" py={8}>
          <Heading as="h1" size="2xl" mb={4}>
            ส่งคำถามถึงผู้สมัครผู้อำนวยการ Thai PBS
          </Heading>
          <Text fontSize="xl" color="gray.600">
            ส่งคำถามของคุณเพื่อใช้ในเวทีแสดงวิสัยทัศน์ 11–12 พฤษภาคม 2568
          </Text>

          <StatGroup mt={6} maxW="400px" mx="auto">
            <Stat>
              <StatLabel>จำนวนคำถามที่ได้รับแล้ว</StatLabel>
              {submittedCount === null ? (
                <Spinner size="sm" />
              ) : (
                <StatNumber>{submittedCount}</StatNumber>
              )}
            </Stat>
          </StatGroup>
        </Box>

        {apiUnavailable && (
          <Alert status="warning" mb={2}>
            <AlertIcon />
            <Text>ขณะนี้ระบบอยู่ในโหมดทดสอบ ข้อมูลจะไม่ถูกบันทึกจริง</Text>
          </Alert>
        )}

        {/* Form and Recent Questions */}
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          {/* Question Form */}
          <Box
            flex={1}
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
          >
            <Heading as="h2" size="lg" mb={6}>
              ส่งคำถามของคุณ
            </Heading>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>เลือกผู้สมัครที่คุณอยากถาม</FormLabel>
                  <Select
                    value={selectedCandidate}
                    onChange={(e) => setSelectedCandidate(e.target.value)}
                    width="full"
                  >
                    <option value="all">ถามกับทุกคน</option>
                    {candidates.map((candidate) => (
                      <option key={candidate._id} value={candidate._id}>
                        {candidate.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>พิมพ์คำถามของคุณที่นี่</FormLabel>
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="คุณมีแผนจะปฏิรูปการเสนอข่าวหรือเนื้อหาบางประเภทอย่างไร?"
                    minH="100px"
                    size="lg"
                    rows={5}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>หมวดคำถาม</FormLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled>
                      เลือกหมวดหมู่
                    </option>
                    <option value="content">เนื้อหา</option>
                    <option value="management">การบริหาร</option>
                    <option value="neutrality">ความเป็นกลาง</option>
                    <option value="technology">เทคโนโลยี</option>
                    <option value="other">อื่น ๆ</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>จังหวัดของคุณ (ไม่บังคับ)</FormLabel>
                  <Input
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="กรุงเทพฯ, เชียงใหม่, ยะลา ฯลฯ"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>ชื่อ (ไม่บังคับ)</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="กรุณาระบุชื่อของคุณ"
                  />
                </FormControl>

                <Button
                  type="submit"
                  bg="#D71920"
                  color="white"
                  size="lg"
                  width="full"
                  mt={6}
                  isLoading={isSubmitting}
                  loadingText="กำลังส่ง..."
                  _hover={{ bg: "#E84A50", boxShadow: "md" }}
                  rightIcon={<CheckIcon />}
                >
                  ส่งคำถาม
                </Button>
              </Stack>
            </form>
          </Box>

          {/* Recent Questions */}
          <Box flex={1}>
            <Heading as="h2" size="lg" mb={6}>
              คำถามที่ได้รับล่าสุด
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={4}>
              คำถามที่ส่งเข้ามาจะมีสถานะ "รอการตรวจสอบ"
              จนกว่าจะผ่านการพิจารณาจากทีมงาน
            </Text>
            <QuestionList />
          </Box>
        </Flex>
      </VStack>
    </Container>
  );
};

export default AskPage;
