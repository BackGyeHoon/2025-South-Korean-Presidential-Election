import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CandidateCardProps {
  name: string;
  party: string;
  image: string;
  color: string;
  id: string;
}

const CandidateCard = ({
  name,
  party,
  image,
  color,
  id,
}: CandidateCardProps) => {
  return (
    <motion.div
      className="rounded-lg shadow-sm bg-white overflow-hidden border border-gray-100 h-full"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-2" style={{ backgroundColor: color }}></div>
      <div className="p-5">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-text-light">{party}</p>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Link
            to={`/candidates/${id}`}
            className="text-sm text-primary hover:underline"
          >
            자세히 보기 &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CandidateCard;
