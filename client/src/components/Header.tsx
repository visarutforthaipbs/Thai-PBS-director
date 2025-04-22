import React from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Button,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Navigation links
  const navLinks = [
    { name: "หน้าหลัก", path: "/" },
    { name: "ผู้สมัคร", path: "/candidates" },
    { name: "ส่งคำถาม", path: "/ask" },
    { name: "สรุปผล", path: "/dashboard" },
  ];

  return (
    <Box
      bg="brand.orange"
      boxShadow="sm"
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      color="white"
    >
      <Container maxW="container.xl" py={3}>
        <Flex justify="space-between" align="center">
          {/* Logo */}
          <RouterLink to="/">
            <Image
              src={`${process.env.PUBLIC_URL}/images/logo-1.png`}
              alt="Thai PBS Logo"
              height="60px"
            />
          </RouterLink>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                as={RouterLink}
                to={link.path}
                fontWeight="bold"
                color="white"
                _hover={{ color: "brand.beige" }}
              >
                {link.name}
              </Link>
            ))}
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
          />

          {/* Mobile Menu Drawer */}
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                <Image
                  src={`${process.env.PUBLIC_URL}/images/logo-1.png`}
                  alt="Thai PBS Logo"
                  height="50px"
                />
              </DrawerHeader>
              <DrawerBody>
                <VStack spacing={4} align="start" mt={4}>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      as={RouterLink}
                      to={link.path}
                      fontWeight="bold"
                      w="100%"
                      onClick={onClose}
                    >
                      {link.name}
                    </Link>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
