import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Spinner,
  Center,
  SimpleGrid,
  Button,
  Divider,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import WordCloud from "react-d3-cloud";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { getCandidateSupport, getWordCloudData } from "../api";
import { CandidateSupport, WordCloudItem } from "../types";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Set global font for Chart.js
ChartJS.defaults.font.family = "'DB Helvethaica X', sans-serif";
ChartJS.defaults.color = "#333333";

const DashboardPage: React.FC = () => {
  const [candidateSupport, setCandidateSupport] = useState<CandidateSupport[]>(
    []
  );
  const [wordCloudData, setWordCloudData] = useState<WordCloudItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<string>("bar");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supportData, cloudData] = await Promise.all([
          getCandidateSupport(),
          getWordCloudData(),
        ]);

        setCandidateSupport(supportData);
        setWordCloudData(cloudData);
        setLoading(false);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartBgColor = useColorModeValue("white", "gray.700");

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

  // Prepare data for the bar chart
  const barChartData = {
    labels: candidateSupport.map((item) => item.candidateName),
    datasets: [
      {
        label: "สนับสนุน",
        data: candidateSupport.map((item) => item.supportCount),
        backgroundColor: "#4CAF50",
      },
      {
        label: "ยังไม่แน่ใจ",
        data: candidateSupport.map((item) => item.neutralCount),
        backgroundColor: "#2196F3",
      },
      {
        label: "ไม่สนับสนุน",
        data: candidateSupport.map((item) => item.againstCount),
        backgroundColor: "#F44336",
      },
    ],
  };

  const barChartOptions = {
    plugins: {
      title: {
        display: true,
        text: "ระดับการสนับสนุนผู้สมัครแต่ละคน",
        font: {
          size: 18,
          family: "'DB Helvethaica X', sans-serif",
        },
      },
      legend: {
        position: "top" as const,
        labels: {
          font: {
            family: "'DB Helvethaica X', sans-serif",
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false,
        ticks: {
          font: {
            family: "'DB Helvethaica X', sans-serif",
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        stacked: false,
        ticks: {
          font: {
            family: "'DB Helvethaica X', sans-serif",
          },
          beginAtZero: true,
        },
        grid: {
          display: true,
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 20,
      },
    },
  };

  // Prepare data for pie/doughnut charts
  const generatePieData = (candidateIndex: number) => {
    const candidate = candidateSupport[candidateIndex];
    if (!candidate) return null;

    return {
      labels: ["สนับสนุน", "ยังไม่แน่ใจ", "ไม่สนับสนุน"],
      datasets: [
        {
          data: [
            candidate.supportCount,
            candidate.neutralCount,
            candidate.againstCount,
          ],
          backgroundColor: ["#4CAF50", "#2196F3", "#F44336"],
        },
      ],
    };
  };

  const pieChartOptions = {
    plugins: {
      title: {
        display: true,
        text: "สัดส่วนความคิดเห็นต่อผู้สมัครแต่ละคน",
        font: {
          size: 18,
          family: "'DB Helvethaica X', sans-serif",
        },
      },
      legend: {
        position: "top" as const,
        labels: {
          font: {
            family: "'DB Helvethaica X', sans-serif",
          },
        },
      },
    },
    responsive: true,
  };

  // Word cloud options
  const wordCloudOptions = {
    fontSizes: [15, 60] as [number, number],
    font: "'DB Helvethaica X', sans-serif",
    padding: 2,
    spiral: "archimedean" as const,
    random: () => 0.5,
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h1" mb={8} textAlign="center" color="brand.orange">
        สรุปความคิดเห็นของประชาชน
      </Heading>

      <SimpleGrid columns={{ base: 1, lg: 1 }} spacing={10}>
        <Box bg={chartBgColor} p={6} borderRadius="lg" boxShadow="md">
          <Tabs isFitted variant="enclosed" colorScheme="orange" mb={4}>
            <TabList>
              <Tab>กราฟแท่ง</Tab>
              <Tab>กราฟวงกลม</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box
                  height="450px"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box width="100%" height="100%">
                    <Bar data={barChartData} options={barChartOptions} />
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel>
                <Heading size="sm" mb={4} textAlign="center">
                  เลือกดูข้อมูลของผู้สมัครแต่ละคน
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                  {candidateSupport.map((candidate, index) => (
                    <Box key={index} height="200px">
                      <Heading size="xs" mb={2} textAlign="center">
                        {candidate.candidateName}
                      </Heading>
                      <Doughnut
                        data={generatePieData(index) as any}
                        options={pieChartOptions}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        <Divider my={8} />

        <Box
          bg={chartBgColor}
          p={6}
          borderRadius="lg"
          boxShadow="md"
          height="500px"
        >
          <Heading as="h3" size="md" mb={4} textAlign="center">
            คำที่พบบ่อยในความคิดเห็น
          </Heading>

          {wordCloudData.length > 0 ? (
            <Box
              height="400px"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <WordCloud
                data={wordCloudData}
                width={800}
                height={400}
                font="'DB Helvethaica X', sans-serif"
                fontSize={(word) => Math.log2(word.value) * 10}
                rotate={() => 0}
                padding={2}
                fill={(d: WordCloudItem) =>
                  d.value > 30
                    ? "#F15A22" // Changed from red to our orange
                    : d.value > 20
                    ? "#666666"
                    : "#999999"
                }
              />
            </Box>
          ) : (
            <Center height="400px">
              <Text>ยังไม่มีข้อมูลเพียงพอสำหรับการแสดงผล</Text>
            </Center>
          )}
        </Box>
      </SimpleGrid>

      <Center mt={10}>
        <Button
          bg="brand.orange"
          color="white"
          _hover={{ bg: "brand.darkOrange" }}
          size="lg"
          onClick={() => window.location.reload()}
        >
          รีเฟรชข้อมูล
        </Button>
      </Center>
    </Container>
  );
};

export default DashboardPage;
