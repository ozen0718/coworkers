"use client";

import React from "react";
import clsx from "clsx";
import IconPlus from "../../assets/icons/IconPlus";
import IconCheck from "../../assets/icons/IconCheck";

export interface ButtonProps {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "inverse"
    | "secondary"
    | "danger"
    | "plus"
    | "complete"
    | "cancel"
    | "textgray"
    | "textgraylight"
    | "grayfilled"
    | "textgraySmall";
  size?: "small" | "large" | "plus" | "complete" | "cancel";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: "reset" | "button" | "submit";
  icon?: "plus" | "check";
}

function Button({
  children,
  variant = "primary",
  size = "large",
  onClick,
  disabled = false,
  className,
  type = "button",
  icon,
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center font-pretendard font-medium";

  const filledGreen =
    "bg-primary text-white hover:bg-primary-hover active:bg-primary-pressed";

  const disabledGreen = "bg-gray400 text-white cursor-not-allowed";

  const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: filledGreen,
    plus: filledGreen,
    complete: filledGreen,
    inverse:
      size === "small"
        ? "bg-bg200 border border-primary text-primary"
        : "bg-white border border-primary text-primary",
    secondary: "bg-white text-gray400 border border-gray300",
    danger: "bg-danger text-white hover:bg-red-600 active:bg-red-700",
    cancel:
      "bg-white border border-primary text-primary hover:border-primary-hover hover:text-primary-hover active:border-primary-pressed active:text-primary-pressed",
    textgray: "bg-white border border-gray300 text-gray500",
    textgraylight: "bg-white border border-gray300 text-gray400",
    grayfilled: "bg-gray400 text-white",
    textgraySmall: "bg-transparent border border-gray400 text-gray400",
  };

  const disabledStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: disabledGreen,
    plus: disabledGreen,
    complete: disabledGreen,
    inverse:
      size === "small"
        ? "bg-bg200 border border-gray400 text-gray400 cursor-not-allowed"
        : "bg-white border border-gray400 text-gray400 cursor-not-allowed",
    secondary: "text-gray400 cursor-not-allowed",
    danger: "bg-gray400 text-gray500 cursor-not-allowed",
    cancel: "bg-white border border-gray400 text-gray400 cursor-not-allowed",
    textgray: "bg-white text-gray400 cursor-not-allowed",
    textgraylight: "bg-white text-gray300 cursor-not-allowed",
    grayfilled: "bg-gray300 text-white cursor-not-allowed",
    textgraySmall:
      "bg-transparent border border-gray300 text-gray400 cursor-not-allowed",
  };

  const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
    small: "text-md-medium w-20 h-8 rounded-xl",
    large: "text-lg-medium w-[332px] h-12 rounded-xl",
    plus: "text-lg-medium w-[125px] h-[48px] rounded-full",
    complete: "text-md-medium w-[111px] h-10 rounded-full",
    cancel: "text-md-medium w-[138px] h-10 rounded-full",
  };

  const iconMap: Record<NonNullable<ButtonProps["icon"]>, React.ReactNode> = {
    plus: <IconPlus />,
    check: <IconCheck />,
  };

  return (
    <button
      type={type}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        !disabled ? variantStyles[variant] : disabledStyles[variant],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="flex items-center justify-center gap-1">
        {icon && iconMap[icon]}
        {children}
      </span>
    </button>
  );
}

export default Button;
