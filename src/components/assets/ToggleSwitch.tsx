import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  color: string;
  size?: "sm" | "md";
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  color,
  size = "md",
}) => {
  const sizeClass =
    size === "sm"
      ? "w-8 h-4 after:w-3 after:h-3 after:top-[2px] after:left-[2px] after:translate-x-4"
      : "w-11 h-6 after:w-5 after:h-5 after:top-[2px] after:left-[2px] after:translate-x-5";

  return (
    <div className="inline-flex items-center">
      <label className="relative inline-flex cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`${sizeClass} bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:bg-white after:rounded-full after:transition-all peer-checked:bg-opacity-90 transition-colors`}
          style={{ backgroundColor: checked ? color : "" }}
        ></div>
      </label>
    </div>
  );
};
