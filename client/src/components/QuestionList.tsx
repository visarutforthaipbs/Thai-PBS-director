import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  Badge,
  Skeleton,
  SkeletonText,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
} from "@chakra-ui/react";
import { getQuestions } from "../api";
import { Question } from "../types";

// Mock data to use when API is not available
const MOCK_QUESTIONS: Question[] = [
  {
    _id: "1",
    name: "ธนพล จ.",
    question: "คุณมีแผนอย่างไรในการปรับปรุงเนื้อหาให้เข้าถึงคนรุ่นใหม่มากขึ้น?",
    status: "approved",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: "content",
  },
  {
    _id: "2",
    name: "สมศรี",
    question: "ท่านมีวิธีการรักษาความเป็นกลางในการนำเสนอข่าวอย่างไร?",
    status: "approved",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    category: "neutrality",
  },
  {
    _id: "3",
    question: "จะมีการพัฒนาแอพพลิเคชั่นหรือช่องทางดิจิทัลอย่างไรบ้าง?",
    status: "approved",
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    category: "technology",
    province: "เชียงใหม่",
  },
];

// Status badge component to better display the status
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let color = "yellow";
  let text = "รอการตรวจสอบ";

  if (status === "approved") {
    color = "green";
    text = "อนุมัติแล้ว";
  } else if (status === "rejected") {
    color = "red";
    text = "ถูกปฏิเสธ";
  }

  return (
    <Badge colorScheme={color} ml={2}>
      {text}
    </Badge>
  );
};

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both approved and pending questions
        const response = await getQuestions();
        setQuestions(response);
        setUseMockData(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        // Use mock data instead of showing error
        setQuestions(MOCK_QUESTIONS);
        setUseMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Format date to Thai locale
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  // Render loading skeletons
  if (loading) {
    return (
      <VStack spacing={4} align="stretch">
        {[...Array(5)].map((_, i) => (
          <Box key={i} p={4} borderWidth="1px" borderRadius="md">
            <Skeleton height="20px" width="40%" mb={2} />
            <SkeletonText mt={2} noOfLines={2} spacing="2" />
            <Skeleton height="15px" width="30%" mt={2} />
          </Box>
        ))}
      </VStack>
    );
  }

  // Render no questions available
  if (questions.length === 0) {
    return (
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        <AlertTitle>ไม่มีคำถาม</AlertTitle>
        <AlertDescription>
          ยังไม่มีคำถามที่สามารถแสดงได้ในขณะนี้
        </AlertDescription>
      </Alert>
    );
  }

  // Render list of questions
  return (
    <VStack spacing={4} align="stretch">
      {useMockData && (
        <Alert status="info" mb={4} borderRadius="md">
          <AlertIcon />
          <Text fontSize="sm">กำลังแสดงตัวอย่างคำถาม</Text>
        </Alert>
      )}

      {questions.map((question) => (
        <Box
          key={question._id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="sm"
          _hover={{ boxShadow: "md" }}
          transition="box-shadow 0.2s"
        >
          <Text fontWeight="bold" fontSize="md" mb={1}>
            {question.name || "ไม่ระบุชื่อ"}{" "}
            {question.province && (
              <Text as="span" fontSize="sm" color="gray.500">
                จาก{question.province}
              </Text>
            )}
            <StatusBadge status={question.status} />
            {question.category && (
              <Badge ml={2} colorScheme="blue">
                {question.category === "content" && "เนื้อหา"}
                {question.category === "management" && "การบริหาร"}
                {question.category === "neutrality" && "ความเป็นกลาง"}
                {question.category === "technology" && "เทคโนโลยี"}
                {question.category === "other" && "อื่นๆ"}
              </Badge>
            )}
          </Text>

          <Text fontSize="md" mb={3}>
            {question.question}
          </Text>

          <Divider my={2} />

          <Text fontSize="sm" color="gray.500">
            {formatDate(question.createdAt)}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};

export default QuestionList;
