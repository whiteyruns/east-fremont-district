import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  variant = "primary",
  children,
  href,
  type = "button",
  disabled = false,
  onClick,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors text-sm font-semibold";

  const variantClasses = {
    primary:
      "bg-[#C49A6C] text-[#0F1115] hover:bg-[#D4AA7C] disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "border border-[#2A2D33] text-[#F0EDE8] hover:border-[#3A3D43] transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
    ghost:
      "text-[#C49A6C] hover:text-[#D4AA7C] disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}
