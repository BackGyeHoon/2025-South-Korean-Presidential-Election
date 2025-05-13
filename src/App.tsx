import { useEffect, useState } from "react";
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
import CandidateAssetsPage from "./pages/CandidateAssetsPage";
import CriminalRecordsPage from "./pages/CriminalRecordsPage";
import ScrollToTop from "./components/utils/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import AnnouncementModal from "./components/ui/AnnouncementModal";
import PolicyReceptionPage from "./pages/PolicyReceptionPage";

// QueryClient 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// 로컬 스토리지 키 상수
const ANNOUNCEMENT_VIEWED_KEY = "announcement_viewed_0603";

function App() {
  // 안내 모달 표시 여부 상태
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  useEffect(() => {
    // 로컬 스토리지 확인
    const hasViewedAnnouncement = localStorage.getItem(ANNOUNCEMENT_VIEWED_KEY);

    // 모달을 본 적이 없으면 표시
    if (!hasViewedAnnouncement) {
      setShowAnnouncementModal(true);
    }
  }, []);

  // 모달 닫기 핸들러
  const handleCloseAnnouncement = () => {
    setShowAnnouncementModal(false);
    // 로컬 스토리지에 모달을 봤다고 저장
    localStorage.setItem(ANNOUNCEMENT_VIEWED_KEY, "true");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Analytics />
        <ScrollToTop />
        {/* 안내 모달 */}
        <AnnouncementModal
          isOpen={showAnnouncementModal}
          onClose={handleCloseAnnouncement}
        />
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
              <Route
                path="/candidate-assets"
                element={<CandidateAssetsPage />}
              />
              <Route
                path="/policy-reception"
                element={<PolicyReceptionPage />}
              />
              <Route
                path="/criminal-records"
                element={<CriminalRecordsPage />}
              />
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
