import React from "react";
import { Box, Container, Flex, Text, Image, HStack } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="brand.orange" py={6} color="white">
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <HStack spacing={6} mb={{ base: 4, md: 0 }}>
            <Image
              src={`${process.env.PUBLIC_URL}/images/1.png`}
              alt="Thai PBS Logo"
              height="50px"
            />
            <Image
              src={`${process.env.PUBLIC_URL}/images/2.png`}
              alt="Thai PBS Logo 2"
              height="50px"
            />
            <Image
              src={`${process.env.PUBLIC_URL}/images/3.png`}
              alt="Thai PBS Logo 3"
              height="50px"
            />
          </HStack>

          <Text fontSize="sm">
            © {new Date().getFullYear()}{" "}
            องค์การกระจายเสียงและแพร่ภาพสาธารณะแห่งประเทศไทย
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
