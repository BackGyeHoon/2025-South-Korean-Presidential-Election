// 후보자 데이터
export const CANDIDATES = [
  {
    id: "lee-jae-myung",
    name: "이재명",
    party: "더불어민주당",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.3xzHk9le72iVFGCiHMyTEAHaKN&w=474&h=474&c=7",
    color: "#0050C9", // 더불어민주당 색상
    description:
      "2022년 대선에서 근소한 차이로 패배한 후, 경제 성장과 기술 투자, 사회 통합을 강조하며 출마를 선언했습니다. 현재 여론조사에서 선두를 달리고 있으나, 여러 건의 법적 문제에 직면해 있습니다.",
    categories: [
      {
        id: "economy",
        title: "경제",
        pledges: [
          {
            id: "economy-1",
            title: "인공지능 기반 경제 혁신",
            description: "인공지능 기술을 활용한 경제 구조 혁신을 추진합니다.",
            details: "AI 산업에 5년간 50조원 투자, 디지털 뉴딜 2.0 추진",
            isComplete: false,
          },
          {
            id: "economy-2",
            title: "중소기업 지원 확대",
            description:
              "중소기업 세금 감면 및 지원금 확대로 경제 활성화를 추진합니다.",
            details: "중소기업 법인세 5% 인하, R&D 지원금 2배 확대",
            isComplete: false,
          },
        ],
      },
      {
        id: "welfare",
        title: "복지",
        pledges: [
          {
            id: "welfare-1",
            title: "기초연금 확대",
            description: "노인 기초연금을 월 40만원으로 인상합니다.",
            details:
              "현재 30만원에서 단계적으로 인상하여 노인 빈곤율을 낮춥니다.",
            isComplete: false,
          },
          {
            id: "welfare-2",
            title: "아동수당 확대",
            description: "아동수당 지급 대상을 만 12세까지 확대합니다.",
            details: "현재 7세에서 12세로 확대하여 양육 부담을 덜어줍니다.",
            isComplete: false,
          },
        ],
      },
      {
        id: "education",
        title: "교육",
        pledges: [
          {
            id: "education-1",
            title: "대학 등록금 지원 확대",
            description: "저소득층 대학생 등록금 전액 지원을 확대합니다.",
            details: "소득 하위 30%까지 확대하여 교육 기회를 보장합니다.",
            isComplete: false,
          },
        ],
      },
    ],
  },
  {
    id: "han-dong-hoon",
    name: "한동훈",
    party: "국민의힘",
    image:
      "https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F38f62ce4-ea5e-43b3-8397-37a5b34b1441.jpg",
    color: "#E61E2B", // 국민의힘 색상
    description:
      "윤석열 전 대통령의 탄핵 이후 당의 재건을 목표로 출마를 선언했습니다. 중도적 입장을 강조하며, 당내 개혁과 국민 통합을 주요 공약으로 내세우고 있습니다.",
    categories: [
      {
        id: "economy",
        title: "경제",
        pledges: [
          {
            id: "economy-1",
            title: "법인세 인하",
            description: "기업 경쟁력 강화를 위한 법인세 인하를 추진합니다.",
            details:
              "최고세율 22%에서 20%로 인하하여 기업 투자 환경을 개선합니다.",
            isComplete: false,
          },
          {
            id: "economy-2",
            title: "규제 혁신",
            description:
              "불필요한 경제 규제를 완화하여 경제 활성화를 도모합니다.",
            details: "규제 샌드박스 확대 및 신산업 분야 규제 개혁 추진",
            isComplete: false,
          },
        ],
      },
      {
        id: "welfare",
        title: "복지",
        pledges: [
          {
            id: "welfare-1",
            title: "맞춤형 복지 확대",
            description:
              "획일적 복지가 아닌 개인별 맞춤형 복지 시스템을 구축합니다.",
            details:
              "복지 포인트 제도 도입으로 개인이 필요한 복지 서비스를 선택할 수 있게 합니다.",
            isComplete: false,
          },
        ],
      },
      {
        id: "education",
        title: "교육",
        pledges: [
          {
            id: "education-1",
            title: "직업교육 강화",
            description: "산업 수요에 맞는 직업교육을 강화합니다.",
            details: "특성화고 지원 확대 및 산학협력 프로그램 확대",
            isComplete: false,
          },
          {
            id: "education-2",
            title: "교육 자율성 확대",
            description: "학교와 교사의 교육 자율성을 확대합니다.",
            details: "교육과정 편성의 자율성 확대 및 교원 평가 제도 개선",
            isComplete: false,
          },
        ],
      },
    ],
  },
  {
    id: "na-kyung-won",
    name: "나경원",
    party: "국민의힘",
    image:
      "https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F747f0503-1cd9-4c5b-ae93-a4e61fa5af89.png",
    color: "#E61E2B", // 국민의힘 색상
    description:
      "보수 진영의 통합과 체제 수호를 강조하며 출마를 선언했습니다. '이재명에 맞설 후보는 나'라는 슬로건을 내세우고 있습니다.",
    categories: [
      {
        id: "economy",
        title: "경제",
        pledges: [
          {
            id: "economy-1",
            title: "민간 주도 경제 성장",
            description:
              "민간의 자율성을 높이고 기업 활동을 지원하여 경제 성장을 도모합니다.",
            details: "기업 규제 완화, 민간 투자 활성화를 위한 세제 혜택 확대",
            isComplete: false,
          },
        ],
      },
      {
        id: "welfare",
        title: "복지",
        pledges: [
          {
            id: "welfare-1",
            title: "장애인 복지 확대",
            description: "장애인 지원 서비스와 일자리 기회를 확대합니다.",
            details: "장애인 의무고용률 확대 및 활동 지원 서비스 강화",
            isComplete: false,
          },
        ],
      },
      {
        id: "education",
        title: "교육",
        pledges: [
          {
            id: "education-1",
            title: "공교육 강화",
            description: "공교육 환경 개선 및 교사 처우 개선을 추진합니다.",
            details:
              "교사 1인당 학생 수 OECD 평균 수준으로 감축, 교원 보수 개선",
            isComplete: false,
          },
        ],
      },
    ],
  },
  {
    id: "kim-moon-soo",
    name: "김문수",
    party: "국민의힘",
    image:
      "https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F4e0a862d-fa43-48ce-84f5-d37ad4dc1ceb.png",
    color: "#E61E2B", // 국민의힘 색상
    description:
      "전 경기도지사이자 노동부 장관을 지낸 인물로, 보수 진영의 대표 주자로 출마를 선언했습니다. 경제 위기 극복과 노동 시장 개혁을 주요 공약으로 내세우고 있습니다.",
    categories: [
      {
        id: "economy",
        title: "경제",
        pledges: [
          {
            id: "economy-1",
            title: "노동시장 개혁",
            description: "노동시장의 유연성을 높여 일자리 창출을 촉진합니다.",
            details: "노동법 개정을 통한 고용 유연화, 성과 중심 임금체계 도입",
            isComplete: false,
          },
        ],
      },
      {
        id: "welfare",
        title: "복지",
        pledges: [
          {
            id: "welfare-1",
            title: "저출산 대책 강화",
            description:
              "출산 장려 정책을 강화하여 인구 감소 문제에 대응합니다.",
            details: "출산 지원금 확대, 육아 휴직 제도 개선",
            isComplete: false,
          },
        ],
      },
      {
        id: "education",
        title: "교육",
        pledges: [
          {
            id: "education-1",
            title: "직업교육 강화",
            description: "실무 중심 교육을 강화해 취업 경쟁력을 높입니다.",
            details: "산학협력 강화, 현장 실습 확대",
            isComplete: false,
          },
        ],
      },
    ],
  },
  {
    id: "ahn-cheol-soo",
    name: "안철수",
    party: "국민의힘",
    image:
      "https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F89f4aee1-2d0b-41ea-9729-8eadf3053928.jpg",
    color: "#E61E2B", // 국민의힘 색상
    description:
      "과거 대선에 세 차례 출마한 경험이 있습니다. 이번 선거에서는 인공지능 등 신기술을 통한 경제 혁신을 강조하며 출마를 선언했습니다.",
    categories: [
      {
        id: "economy",
        title: "경제",
        pledges: [
          {
            id: "economy-1",
            title: "AI 혁신 경제",
            description: "인공지능 기술을 통한 산업 혁신을 추진합니다.",
            details: "AI 인재 10만명 양성, 디지털 전환 지원 확대",
            isComplete: false,
          },
        ],
      },
      {
        id: "welfare",
        title: "복지",
        pledges: [
          {
            id: "welfare-1",
            title: "디지털 헬스케어 확대",
            description: "첨단 의료기술을 활용한 건강관리 시스템을 구축합니다.",
            details: "원격진료 확대, 개인맞춤형 건강관리 서비스 도입",
            isComplete: false,
          },
        ],
      },
      {
        id: "education",
        title: "교육",
        pledges: [
          {
            id: "education-1",
            title: "미래인재 양성",
            description:
              "코딩 교육 의무화 등 디지털 역량 강화 교육을 확대합니다.",
            details: "초중고 코딩 교육 확대, 디지털 문해력 교육 강화",
            isComplete: false,
          },
        ],
      },
    ],
  },
  {
    id: "hong-joon-pyo",
    name: "홍준표",
    party: "국민의힘",
    image:
      "https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202110%2F20211002100802747.jpg",
    color: "#E61E2B", // 국민의힘 색상
    description:
      "전 대구시장으로, 국민의힘 경선에 참여하기 위해 출마를 선언했습니다. 보수 진영의 전통적인 가치를 강조하며, 강한 리더십을 내세우고 있습니다.",
    categories: [
      {
        id: "economy",
        title: "경제",
        pledges: [
          {
            id: "economy-1",
            title: "중소기업 육성",
            description: "중소기업 지원을 통한 균형 경제 발전을 추진합니다.",
            details: "중소기업 세제 혜택 확대, 대기업과의 상생협력 강화",
            isComplete: false,
          },
        ],
      },
      {
        id: "welfare",
        title: "복지",
        pledges: [
          {
            id: "welfare-1",
            title: "국가안보 강화",
            description: "국방력 강화를 통한 국가 안보를 확보합니다.",
            details: "국방비 증액, 첨단 무기 체계 도입",
            isComplete: false,
          },
        ],
      },
      {
        id: "education",
        title: "교육",
        pledges: [
          {
            id: "education-1",
            title: "교육 경쟁력 강화",
            description: "학생들의 경쟁력 강화를 위한 교육 개혁을 추진합니다.",
            details: "영재교육 확대, 기초학력 보장 강화",
            isComplete: false,
          },
        ],
      },
    ],
  },
  {
    id: "yoo-jeong-bok",
    name: "유정복",
    party: "국민의힘",
    image:
      "https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202303%2F20230314094924231.jpg",
    color: "#E61E2B", // 국민의힘 색상
    description:
      "현 인천시장으로, 국민 대통합을 목표로 출마를 선언했습니다. 지방 행정 경험을 바탕으로 국가 운영의 효율성을 강조하고 있습니다.",
    categories: [
      {
        id: "economy",
        title: "경제",
        pledges: [
          {
            id: "economy-1",
            title: "지역경제 활성화",
            description: "지역 균형 발전을 통한 국가 경제 성장을 추진합니다.",
            details: "지역특화산업 육성, 수도권 과밀화 해소 정책 추진",
            isComplete: false,
          },
        ],
      },
      {
        id: "welfare",
        title: "복지",
        pledges: [
          {
            id: "welfare-1",
            title: "주거복지 확대",
            description: "서민 주거 안정을 위한 정책을 강화합니다.",
            details: "공공임대주택 확대, 청년·신혼부부 주택 지원 강화",
            isComplete: false,
          },
        ],
      },
      {
        id: "education",
        title: "교육",
        pledges: [
          {
            id: "education-1",
            title: "지역 교육격차 해소",
            description: "지역 간 교육 격차 해소를 위한 정책을 추진합니다.",
            details: "지방 대학 육성, 교육 인프라 균형 배분",
            isComplete: false,
          },
        ],
      },
    ],
  },
  {
    id: "lee-jun-seok",
    name: "이준석",
    party: "개혁신당",
    image:
      "https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F201612%2F20161208185919769.jpg",
    color: "#FF8200", // 개혁신당 색상을 주황색으로 변경
    description:
      "개혁신당 대표로, 국민의힘 전 대표이기도 합니다. 젊은 세대의 지지를 바탕으로 정치 개혁과 세대 교체를 주장하며 출마를 선언했습니다.",
    categories: [
      {
        id: "economy",
        title: "경제",
        pledges: [
          {
            id: "economy-1",
            title: "스타트업 지원 강화",
            description:
              "청년 창업과 혁신 기업 육성을 통한 경제 활력을 도모합니다.",
            details: "창업 펀드 확대, 규제 샌드박스 강화, 실패 용인 문화 조성",
            isComplete: false,
          },
        ],
      },
      {
        id: "welfare",
        title: "복지",
        pledges: [
          {
            id: "welfare-1",
            title: "세대 간 공정성 확보",
            description:
              "청년 세대를 위한 사회 안전망 구축과 기회 균등을 보장합니다.",
            details: "청년 기본소득 도입, 주거 지원 확대, 고용 안정망 강화",
            isComplete: false,
          },
        ],
      },
      {
        id: "education",
        title: "교육",
        pledges: [
          {
            id: "education-1",
            title: "교육 혁신",
            description: "미래 인재 양성을 위한 교육 시스템 개혁을 추진합니다.",
            details:
              "입시 중심 교육 탈피, 창의성 교육 확대, 평생학습 체계 구축",
            isComplete: false,
          },
        ],
      },
    ],
  },
  {
    id: "kim-kyoung-soo",
    name: "김경수",
    party: "더불어민주당",
    image:
      "https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F201806%2F2018062011382676.jpg",
    color: "#0050C9", // 더불어민주당 색상
    description:
      "전 경남도지사로, 더불어민주당 내 비명계 인사로 분류됩니다. 과거 여론 조작 사건으로 유죄 판결을 받았으나, 이번 선거에서 정치 복귀를 시도하고 있습니다.",
    categories: [
      {
        id: "economy",
        title: "경제",
        pledges: [
          {
            id: "economy-1",
            title: "디지털 전환 가속화",
            description:
              "디지털 기술을 통한 산업 혁신과 일자리 창출을 추진합니다.",
            details: "디지털 전환 지원 센터 설립, 중소기업 디지털화 지원 확대",
            isComplete: false,
          },
        ],
      },
      {
        id: "welfare",
        title: "복지",
        pledges: [
          {
            id: "welfare-1",
            title: "사회안전망 강화",
            description: "취약계층을 위한 복지 지원을 확대합니다.",
            details: "기초생활보장 수급자 확대, 노인 일자리 확대",
            isComplete: false,
          },
        ],
      },
      {
        id: "education",
        title: "교육",
        pledges: [
          {
            id: "education-1",
            title: "지역 교육 균형 발전",
            description: "지방 교육의 질적 향상을 위한 정책을 추진합니다.",
            details: "지방 대학 육성, 교육 인프라 균형 배분",
            isComplete: false,
          },
        ],
      },
    ],
  },
];
