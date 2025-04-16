import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop 컴포넌트
 *
 * 페이지 이동 시 스크롤 위치를 항상 최상단으로 이동시키는 컴포넌트입니다.
 * App 컴포넌트 내부, Router 안에 위치시켜 사용합니다.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 페이지 변경 시 스크롤을 최상단으로 이동
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
