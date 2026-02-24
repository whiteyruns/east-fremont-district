import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = "",
  onClick,
  hoverable = false,
}: CardProps) {
  const baseClasses =
    "bg-[#1A1D23] border border-[#2A2D33] rounded-lg";

  const hoverClasses = hoverable ? "hover:border-[#3A3D43] transition-colors" : "";

  const combinedClasses = `${baseClasses} ${hoverClasses} ${className}`;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={combinedClasses}
      >
        {children}
      </button>
    );
  }

  return <div className={combinedClasses}>{children}</div>;
}
