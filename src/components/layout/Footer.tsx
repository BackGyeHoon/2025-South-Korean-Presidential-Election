import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">공육공삼</h3>
            <p className="text-text-light">
              2025년 대한민국 제21대 대통령 선거에 대한 모든 정보를 한 곳에서
              확인하세요.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">주요 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-light hover:text-primary">
                  홈
                </Link>
              </li>
              <li>
                <Link
                  to="/pledges"
                  className="text-text-light hover:text-primary"
                >
                  공약 안내
                </Link>
              </li>
              <li>
                <Link
                  to="/comparison"
                  className="text-text-light hover:text-primary"
                >
                  후보자 비교
                </Link>
              </li>
              <li>
                <Link
                  to="/voting-info"
                  className="text-text-light hover:text-primary"
                >
                  투표 안내
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">관련 사이트</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="http://www.nec.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light hover:text-primary"
                >
                  중앙선거관리위원회
                </a>
              </li>
              <li>
                <a
                  href="https://www.president.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light hover:text-primary"
                >
                  대한민국 청와대
                </a>
              </li>
              <li>
                <a
                  href="https://www.assembly.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light hover:text-primary"
                >
                  대한민국 국회
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-text-light">
          <p>
            © 2025 대한민국 대통령 선거 정보 플랫폼. 본 사이트는 교육 및 정보
            제공의 목적으로 제작되었습니다.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
