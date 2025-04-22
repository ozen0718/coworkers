"use client";

import { ToggleInputProps } from "@/types/types";
import { useState } from "react";
import Image from "next/image";

const InputStyle =
  "w-full h-12 mobile:h-11 bg-[var(--color-bg200)] border border-[var(--color-gray100)]/10 rounded-xl px-4 focus:outline-none focus:border-[var(--color-primary)] hover:border-[var(--color-primary-hover)] text-[var(--color-gray100)] text-4 text-lg-regular mobile:text-md-regular mobile:text-3.5 placeholder:text-[var(--color-gray500)]";

const CurrentValueStyle =
  "w-full h-12 mobile:h-11 bg-[var(--color-bg100)] border border-[var(--color-gray100)]/10 rounded-xl px-4 text-[var(--color-gray500)] text-4 mobile:text-3.5";

const InvalidMessageStyle =
  "text-md-medium/[17px] text-[var(--color-danger)] invisible peer-invalid:visible peer-placeholder-shown:invisible mt-2";

export function EmailInput() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && value.length > 0;

  return (
    <>
      <input
        type="email"
        className={`${InputStyle} peer ${isInvalid ? "invalid:border-[var(--color-danger)]" : ""}`}
        placeholder="이메일을 입력하세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        required
      />
      {isInvalid && (
        <p className={InvalidMessageStyle}>유효한 이메일이 아닙니다.</p>
      )}
    </>
  );
}

export function PasswordInput() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && value.length > 0;

  return (
    <>
      <div className="relative w-full h-12 mobile:h-11">
        <input
          type="password"
          className={`${InputStyle} peer ${isInvalid ? "border-red-500" : ""}`}
          placeholder="비밀번호를 입력하세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          required
        />
        <Image
          src="/icons/visibility_off.svg"
          alt=""
          width={24}
          height={24}
          className="absolute top-3 right-4"
        />
      </div>
      {isInvalid && (
        <p className={InvalidMessageStyle}>
          비밀번호는 영문과 숫자를 포함한 4~12자로 입력해주세요.
        </p>
      )}
    </>
  );
}

export function CurrentEmail() {
  return (
    <div className={`${CurrentValueStyle} flex items-center`}>현재 이메일</div>
  );
}

export function CurrentPassword() {
  return (
    <div className={`${CurrentValueStyle} flex items-center`}>
      {"•".repeat(8)}
    </div>
  );
}

export function ToggleInput({ options, onSelect }: ToggleInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <>
      <div className="relative w-full h-12 mobile:h-11">
        <div
          className={`${InputStyle} flex items-center text-[var(--color-gray500)]`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
        </div>
        <Image
          src="/icons/toggle.svg"
          alt=""
          width={24}
          height={24}
          className="absolute top-3 right-4"
        />
      </div>
      {isOpen && (
        <div className="w-full h-content bg-[var(--color-bg200)] rounded-xl border border-[var(--color-gray100)]/10 text-md-regular overflow-hidden z-10 absolute mt-1">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full h-10 px-4 py-[11.5px] text-left hover:bg-[var(--color-primary-hover)]"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
