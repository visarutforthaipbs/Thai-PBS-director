import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  VStack,
  HStack,
  Divider,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { CalendarIcon, CheckIcon } from "@chakra-ui/icons";

const TimelinePopup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const hasSeenPopup = localStorage.getItem("hasSeenTimelinePopup");

    if (!hasSeenPopup && !hasShown) {
      onOpen();
      setHasShown(true);
    }
  }, [onOpen, hasShown]);

  const handleClose = () => {
    // Set flag in localStorage to not show again in this session
    localStorage.setItem("hasSeenTimelinePopup", "true");
    onClose();
  };

  // Timeline data
  const timelineItems = [
    {
      period: "กุมภาพันธ์",
      description: "แต่งตั้งคณะกรรมการสรรหา 9 คน จากผู้ทรงคุณวุฒิหลากหลายสาขา",
      isCompleted: true,
    },
    {
      period: "1–30 มีนาคม",
      description:
        "เปิดรับสมัครผู้สนใจผ่านเว็บไซต์ www.thaipbs.or.th/NewDirector",
      isCompleted: true,
    },
    {
      period: "เมษายน",
      description: "ตรวจสอบคุณสมบัติและลักษณะต้องห้ามของผู้สมัคร",
      isCompleted: true,
    },
    {
      period: "พฤษภาคม",
      description:
        "สัมภาษณ์และให้ผู้สมัครแสดงวิสัยทัศน์ต่อสาธารณะผ่านช่องทางออนไลน์",
      isCompleted: false,
    },
    {
      period: "มิถุนายน",
      description: "ประกาศผลการสรรหาและแต่งตั้งผู้อำนวยการคนใหม่",
      isCompleted: false,
    },
    {
      period: "กรกฎาคม",
      description: "ผู้อำนวยการและคณะผู้บริหารชุดใหม่เริ่มปฏิบัติงาน​",
      isCompleted: false,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" isCentered>
      <ModalOverlay backdropFilter="blur(3px)" />
      <ModalContent>
        <ModalHeader bg="#D71920" color="white" borderTopRadius="md">
          <HStack>
            <CalendarIcon mr={2} />
            <Text>กรอบเวลาการสรรหา (พ.ศ. 2568)</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody p={6}>
          <VStack spacing={4} align="stretch">
            {timelineItems.map((item, index) => (
              <Box key={index}>
                <HStack align="flex-start" spacing={4}>
                  <Box
                    minWidth="110px"
                    fontWeight="bold"
                    color={item.isCompleted ? "#D71920" : "gray.600"}
                  >
                    {item.period}
                  </Box>
                  <Box flex="1">
                    <HStack align="flex-start" spacing={2}>
                      {item.isCompleted && (
                        <Icon as={CheckIcon} color="green.500" mt={1} />
                      )}
                      <Text color={item.isCompleted ? "black" : "gray.600"}>
                        {item.description}
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
                {index < timelineItems.length - 1 && <Divider my={3} />}
              </Box>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleClose}>
            เข้าใจแล้ว
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TimelinePopup;
