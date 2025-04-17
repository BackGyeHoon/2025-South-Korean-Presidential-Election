import React from "react";
import { motion } from "framer-motion";

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
}

const InfoCard = ({ title, icon, description, details }: InfoCardProps) => {
  return (
    <motion.div
      className="w-full rounded-lg shadow-sm bg-white overflow-hidden border border-gray-100 h-full"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            {icon}
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-sm text-text-light mb-4">{description}</p>
        <div className="text-xs text-text-light">{details}</div>
      </div>
    </motion.div>
  );
};

export default InfoCard;
