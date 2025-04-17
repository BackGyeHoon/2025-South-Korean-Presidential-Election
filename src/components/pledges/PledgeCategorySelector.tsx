import React from "react";
import { Button } from "../ui/button";

export type CategoryOption = {
  id: string;
  label: string;
};

interface PledgeCategorySelectorProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const PledgeCategorySelector: React.FC<PledgeCategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex overflow-x-auto pb-3 -mx-2 px-2 mb-8 md:overflow-visible md:flex-wrap md:pb-0">
      <div className="flex gap-2 md:flex-wrap md:gap-2">
        <Button
          variant={selectedCategory === "all" ? "taeguk" : "outline"}
          onClick={() => onCategoryChange("all")}
          className="px-3 py-1.5 md:py-1 text-sm whitespace-nowrap flex-shrink-0"
        >
          전체
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "taeguk" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className="px-3 py-1.5 md:py-1 text-sm whitespace-nowrap flex-shrink-0"
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PledgeCategorySelector;
