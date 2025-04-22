import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Button,
  Select,
  Text,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { submitOpinion, getCandidate } from "../api";
import { Opinion, Candidate } from "../types";

// Thai regions and provinces
const regions = [
  "กรุงเทพและปริมณฑล",
  "ภาคเหนือ",
  "ภาคตะวันออกเฉียงเหนือ",
  "ภาคกลาง",
  "ภาคตะวันออก",
  "ภาคตะวันตก",
  "ภาคใต้",
];

const OpinionFormPage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId?: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(!!candidateId);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Opinion>({
    support: "ยังไม่แน่ใจ",
    comment: "",
    region: "",
    candidateId: candidateId || undefined,
  });

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!candidateId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCandidate(candidateId);
        setCandidate(data);
        setLoading(false);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลผู้สมัครได้");
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupportChange = (
    value: "สนับสนุน" | "ยังไม่แน่ใจ" | "ไม่สนับสนุน"
  ) => {
    setFormData((prev) => ({ ...prev, support: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitOpinion(formData);
      toast({
        title: "ส่งความคิดเห็นสำเร็จ",
        description: "ขอบคุณสำหรับการมีส่วนร่วม",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/thank-you");
    } catch (err) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งความคิดเห็นได้ กรุณาลองใหม่อีกครั้ง",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.orange" />
      </Center>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
        <Heading as="h1" mb={6} color="brand.orange" textAlign="center">
          {candidate
            ? `แสดงความคิดเห็นต่อ ${candidate.name}`
            : "แสดงความคิดเห็นต่อผู้สมัคร"}
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl id="support" isRequired mb={6}>
            <FormLabel>ความคิดเห็นของท่าน</FormLabel>
            <RadioGroup value={formData.support} onChange={handleSupportChange}>
              <Stack direction="column" spacing={4}>
                <Radio value="สนับสนุน" colorScheme="orange">
                  สนับสนุน
                </Radio>
                <Radio value="ยังไม่แน่ใจ" colorScheme="gray">
                  ยังไม่แน่ใจ
                </Radio>
                <Radio value="ไม่สนับสนุน" colorScheme="orange">
                  ไม่สนับสนุน
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl id="comment" mb={6}>
            <FormLabel>อะไรที่อยากให้ผู้อำนวยการคนใหม่นี้ทำ?</FormLabel>
            <Textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="ระบุสิ่งที่คุณอยากให้ผู้อำนวยการคนใหม่ดำเนินการหรือให้ความสำคัญ"
              resize="vertical"
              rows={5}
            />
          </FormControl>

          <FormControl id="region" mb={6}>
            <FormLabel>ภูมิภาค/จังหวัด</FormLabel>
            <Select
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              placeholder="เลือกภูมิภาค (ไม่จำเป็น)"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            colorScheme="orange"
            size="lg"
            width="full"
            isLoading={submitting}
            loadingText="กำลังส่งข้อมูล"
          >
            ส่งความคิดเห็น
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default OpinionFormPage;
