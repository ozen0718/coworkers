'use client';

import { useState } from 'react';
import BaseDropdown, { DropDownProps } from './BaseDropdown';
import DropDownOpenBtn from './DropDownOpenBtn';

interface SelectableDropdownProps extends DropDownProps {
  /** 언컨트롤드 초기값 */
  defaultValue?: string;
  /** 컨트롤드 모드: 현재 선택된 값 */
  value?: string;
  /** 컨트롤드 모드: 값이 바뀔 때 호출되는 콜백 (new label) */
  onChange?: (newValue: string) => void;
  /** 드롭다운 열림 여부 (외부 제어용) */
  isOpen?: boolean;
  /** 드롭다운 열림 상태 setter (외부 제어용) */
  setIsOpen?: (open: boolean) => void;
}

export default function SelectableDropdown({
  options,
  footerBtn,
  size,
  placement,
  defaultValue,
  value: controlledValue,
  onChange,
  onSelect,
  isOpen,
  setIsOpen,
}: SelectableDropdownProps) {
  const [uncontrolledSelected, setUncontrolledSelected] = useState<string>(
    defaultValue ?? (typeof options[0] === 'string' ? options[0] : '')
  );

  const currentSelected = controlledValue !== undefined ? controlledValue : uncontrolledSelected;

  const handleClickOption = (e: React.MouseEvent<HTMLDivElement>) => {
    const newLabel = e.currentTarget.textContent ?? '';

    if (controlledValue === undefined) {
      setUncontrolledSelected(newLabel);
    }

    onChange?.(newLabel);
    onSelect?.(e);

    // 항목 선택 후 드롭다운 닫기
    setIsOpen?.(false);
  };

  const handleClickOpenBtn = () => {
    setIsOpen?.(!isOpen);
  };

  return (
    <BaseDropdown
      dropDownOpenBtn={
        <div onClick={handleClickOpenBtn}>
          <DropDownOpenBtn size={size} currentSelected={currentSelected} />
        </div>
      }
      isOpen={isOpen}
      onSelect={handleClickOption}
      options={options}
      size={size}
      footerBtn={footerBtn}
      placement={placement}
    />
  );
}
