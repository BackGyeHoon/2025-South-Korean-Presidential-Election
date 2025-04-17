// PledgeCard 컴포넌트 속성 정의
interface PledgeCardProps {
  id: string;
  title: string;
  description: string;
  details?: string;
  isComplete?: boolean;
}

// 공약 카드 컴포넌트
const PledgeCard: React.FC<PledgeCardProps> = ({
  title,
  description,
  details,
  isComplete = false,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      {details && (
        <div className="text-sm text-gray-600 border-t pt-2 mt-2">
          <span className="font-medium">세부 내용: </span>
          {details}
        </div>
      )}
      {isComplete && (
        <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          완료됨
        </div>
      )}
    </div>
  );
};

export default PledgeCard;
