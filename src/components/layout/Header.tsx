import * as React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="공육공삼 로고"
            className="h-24 md:h-28"
          />
        </Link>

        {/* 모바일 메뉴 버튼 */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex md:items-center space-x-8">
          <NavLink to="/">홈</NavLink>
          <NavLink to="/pledges">공약 안내</NavLink>
          <NavLink to="/comparison">후보자 비교</NavLink>
          <NavLink to="/voting-info">투표 안내</NavLink>
        </nav>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 md:hidden">
            <div className="container mx-auto px-4 py-1 flex flex-col">
              <Link
                to="/"
                className="py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                홈
              </Link>
              <Link
                to="/pledges"
                className="py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                공약 안내
              </Link>
              <Link
                to="/comparison"
                className="py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                후보자 비교
              </Link>
              <Link
                to="/voting-info"
                className="py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                투표 안내
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// 네비게이션 링크 컴포넌트
const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={to}
      className="font-medium text-text-light hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
};

export default Header;
