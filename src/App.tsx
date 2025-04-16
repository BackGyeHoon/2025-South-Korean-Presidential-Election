import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import PledgesPage from "./pages/PledgesPage";
import VotingInfoPage from "./pages/VotingInfoPage";
import CandidateDetailPage from "./pages/CandidateDetailPage";
import CandidateComparePage from "./pages/CandidateComparePage";
import ScrollToTop from "./components/utils/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

// QueryClient 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Analytics />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pledges" element={<PledgesPage />} />
              <Route
                path="/candidates/:candidateId"
                element={<CandidateDetailPage />}
              />
              <Route path="/comparison" element={<CandidateComparePage />} />
              <Route path="/voting-info" element={<VotingInfoPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
