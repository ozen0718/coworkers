"use client";

import { useState } from "react";
import DropDown, { DropDownProps, Size } from "./index";
import clsx from "clsx";
import Image from "next/image";

const dropDownIcon = "/icons/gnb_menu.svg";

interface DropDownOpenBtnProps {
  size: Size;
  currentSelected: string;
}

function DropDownOpenBtn({ size, currentSelected }: DropDownOpenBtnProps) {
  return (
    <div
      className={clsx(
        "bg-bg200 flex items-center justify-center rounded-xl",
        size === "xs" && "text-xs-rg h-10 w-[94px] px-2 py-2",
        size === "sm" && "text-md-rg bg-bg400 h-11 w-[109px] px-3 py-[10px]",
        size === "md" && "text-md-rg h-11 w-30 px-[14px] py-[10px]",
        size === "xl" && "text-lg-rg h-fit w-[97px]"
      )}
    >
      <div className="flex w-full justify-between">
        <p className="w-full truncate">{currentSelected}</p>
        <Image src={dropDownIcon} width={16} height={7} alt="드롭다운 아이콘" />
      </div>
    </div>
  );
}

interface SelectedDropDownProps extends DropDownProps {
  defaultValue?: string;
}

export function OptionSelector({
  onSelect,
  options,
  defaultValue,
  footerBtn,
  size,
  placement,
}: SelectedDropDownProps) {
  const [currentSelected, setCurrentSelected] = useState(
    defaultValue ?? (options[0] as string)
  );

  const handleClickOption = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentSelected(e.currentTarget.textContent!);
    onSelect?.(e);
  };

  return (
    <DropDown
      dropDownOpenBtn={
        <DropDownOpenBtn size={size} currentSelected={currentSelected} />
      }
      onSelect={handleClickOption}
      options={options}
      size={size}
      footerBtn={footerBtn}
      placement={placement}
    />
  );
}
