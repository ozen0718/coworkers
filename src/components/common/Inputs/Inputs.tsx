'use client';

import {
  ToggleInputProps,
  CurrentEmailProp,
  TextInputProps,
  TextAreaInputProps,
} from '@/types/inputtypes';
import Button from '@/components/common/Button/Button';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const InputStyle =
  'w-full h-12 mobile:h-11 bg-bg200 border border-gray100/10 rounded-xl px-4 focus:outline-none focus:border-primary hover:border-primary-hover text-gray100 text-4 text-lg-regular mobile:text-md-regular mobile:text-3.5 placeholder:text-gray500';

const CurrentValueStyle =
  'w-full h-12 mobile:h-11 bg-bg100 border border-gray100/10 rounded-xl px-4 text-gray500 text-4 mobile:text-3.5 text-lg-regular mobile:text-md-regular';

const InvalidMessageStyle = 'text-md-medium/[17px] text-danger mt-2';

export function EmailInput() {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isInvalid = touched && value.length > 0 && !isValidEmail(value);

  return (
    <div>
      <input
        type="email"
        className={`${InputStyle} peer ${isInvalid ? 'border-red-500' : ''}`}
        placeholder="이메일을 입력하세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        required
      />
      {isInvalid && <p className={InvalidMessageStyle}>유효한 이메일이 아닙니다.</p>}
    </div>
  );
}

export function PasswordInput() {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 유효성 검사: 영문 + 숫자 포함, 4~12자
  const isValidPassword = (password: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/.test(password);

  const isInvalid = touched && value.length > 0 && !isValidPassword(value);

  return (
    <>
      <div className={`${InputStyle} flex items-center justify-between gap-3`}>
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full focus:outline-none ${isInvalid ? 'border-red-500' : ''}`}
          placeholder="비밀번호를 입력하세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          required
        />
        {showPassword ? (
          <Image
            src="/icons/visibility_on.svg"
            alt="비밀번호 숨기기"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <Image
            src="/icons/visibility_off.svg"
            alt="비밀번호 보기"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>

      {isInvalid && (
        <p className={InvalidMessageStyle}>
          비밀번호는 영문과 숫자를 포함한 4~12자로 입력해주세요.
        </p>
      )}
    </>
  );
}

export function CurrentEmail({ email }: CurrentEmailProp) {
  return <div className={`${CurrentValueStyle} flex items-center`}>{email}</div>;
}

export function CurrentPassword() {
  return (
    <div className={`${CurrentValueStyle} flex items-center justify-between`}>
      <div className="">{'•'.repeat(8)}</div>
      <Button size="small">변경하기</Button>
    </div>
  );
}

export function ToggleInput({ options, onSelect }: ToggleInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="mobile:h-11 relative h-12 w-full cursor-pointer">
      <div
        className={`${InputStyle} text-gray500 hover:border-primary-hover flex items-center`}
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
      {isOpen && (
        <div className="h-content bg-bg200 border-gray100/10 text-md-regular absolute z-10 mt-1 w-full overflow-hidden rounded-xl border">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="hover:bg-primary-hover h-10 w-full px-4 py-[11.5px] text-left"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function TodoCardReplyInput() {
  const [value, setValue] = useState('');

  const isEmpty = value.trim() === '';

  return (
    <div className="border-y-gray100/10 text-3.5 flex w-full items-center gap-3 border border-x-0 py-3.25">
      <textarea
        className="text-md-regular w-full resize-none overflow-hidden focus:outline-none"
        style={{ minHeight: '24px', height: '24px', maxHeight: '30dvh' }}
        placeholder="댓글을 달아주세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = '24px';
          target.style.height = `${target.scrollHeight}px`;
        }}
      />
      <button
        disabled={isEmpty}
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          value.trim() === ''
            ? 'bg-gray500 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-hover'
        }`}
      >
        <Image src="/icons/arrow_up.svg" width={16} height={16} alt="댓글 달기" />
      </button>
    </div>
  );
}

export function TextInput({ placeholder }: TextInputProps) {
  return <input type="text" className={InputStyle} placeholder={placeholder} />;
}

export function TextAreaInput({ placeholder, height }: TextAreaInputProps) {
  return (
    <textarea
      className={`bg-bg200 border-gray100/10 focus:border-primary hover:border-primary-hover text-gray100 text-4 text-lg-regular placeholder:text-gray500 w-full resize-none rounded-xl border px-4 py-3 focus:outline-none ${height}`}
      placeholder={placeholder}
    />
  );
}
