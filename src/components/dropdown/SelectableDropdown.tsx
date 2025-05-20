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
}

export default function SelectableDropdown({
  options,
  footerBtn,
  size,
  placement,
  defaultValue,
  value: controlledValue,
  onChange,
  onSelect, // BaseDropdown 으로 내려가는 기존 콜백
}: SelectableDropdownProps) {
  // 내부 언컨트롤드 상태
  const [uncontrolledSelected, setUncontrolledSelected] = useState<string>(
    defaultValue ?? (typeof options[0] === 'string' ? options[0] : '')
  );

  // 실제로 보여줄 텍스트: 컨트롤드가 주어지면 그걸, 아니면 언컨트롤드
  const currentSelected = controlledValue !== undefined ? controlledValue : uncontrolledSelected;

  const handleClickOption = (e: React.MouseEvent<HTMLDivElement>) => {
    const newLabel = e.currentTarget.textContent ?? '';

    // 1) 언컨트롤드 모드라면 내부 상태 업데이트
    if (controlledValue === undefined) {
      setUncontrolledSelected(newLabel);
    }
    // 2) 컨트롤드 모드라면 상위 onChange 콜백 호출
    onChange?.(newLabel);
    // 3) 기존 onSelect 콜백도 전달
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
