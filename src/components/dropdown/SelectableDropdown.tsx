'use client';

import { useState } from 'react';
import BaseDropdown, { DropDownProps } from './BaseDropdown';
import DropDownOpenBtn from './DropDownOpenBtn';

interface SelectableDropdownProps extends DropDownProps {
  defaultValue?: string;
}

export default function SelectableDropdown({
  onSelect,
  options,
  defaultValue,
  footerBtn,
  size,
  placement,
}: SelectableDropdownProps) {
  const [currentSelected, setCurrentSelected] = useState(defaultValue ?? (options[0] as string));

  const handleClickOption = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentSelected(e.currentTarget.textContent!);
    onSelect?.(e);
  };

  return (
    <BaseDropdown
      dropDownOpenBtn={<DropDownOpenBtn size={size} currentSelected={currentSelected} />}
      onSelect={handleClickOption}
      options={options}
      size={size}
      footerBtn={footerBtn}
      placement={placement}
    />
  );
}
