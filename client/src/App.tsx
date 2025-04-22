import React from "react";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import theme from "./theme";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages - will be implemented next
import HomePage from "./pages/HomePage";
import CandidateListPage from "./pages/CandidateListPage";
import CandidateDetailPage from "./pages/CandidateDetailPage";
import OpinionFormPage from "./pages/OpinionFormPage";
import DashboardPage from "./pages/DashboardPage";
import ThankYouPage from "./pages/ThankYouPage";
import AskPage from "./pages/AskPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Flex direction="column" minHeight="100vh">
          <Header />
          <Box flex="1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/candidates" element={<CandidateListPage />} />
              <Route path="/candidates/:id" element={<CandidateDetailPage />} />
              <Route
                path="/opinion"
                element={<Navigate to="/candidates" replace />}
              />
              <Route
                path="/opinion/:candidateId"
                element={<OpinionFormPage />}
              />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/ask" element={<AskPage />} />
            </Routes>
          </Box>
          <Footer />
        </Flex>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
