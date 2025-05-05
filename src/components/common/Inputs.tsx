'use client';

import {
  InputProps,
  ToggleInputProps,
  CurrentEmailProp,
  TextInputProps,
  TextAreaInputProps,
  CurrentNameProp,
} from '@/types/inputtypes';
import useClickOutside from '@/hooks/useClickOutside';
import useValidatedInput from '@/hooks/useValidatedInput';
import Button, { ButtonProps } from '@/components/common/Button/Button';
import { nameRegex, emailRegex, passwordRegex } from '@/utils/regex';
import { useState, useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const BaseInputStyle =
  'w-full sm:h-12 h-11 bg-bg200 border border-gray100/10 rounded-xl px-4 focus:border-primary hover:border-primary-hover';

const EmailInputStyle = `${BaseInputStyle} focus:outline-none placeholder:text-gray500 sm:text-4 sm:text-lg-regular text-md-regular text-3.5`;

const PasswordInputStyle =
  'w-full focus:outline-none sm:text-4 sm:text-lg-regular text-md-regular text-3.5 placeholder:text-gray500';

const InputStyle =
  'w-full sm:h-12 h-11 bg-bg200 border border-gray100/10 rounded-xl px-4 focus:outline-none focus:border-primary hover:border-primary-hover sm:text-4 sm:text-lg-regular text-md-regular text-3.5 placeholder:text-gray500';

const CurrentValueStyle =
  'w-full sm:h-12 h-11 bg-bg100 border border-gray100/10 rounded-xl px-4 text-gray500 sm:text-4 text-3.5 sm:text-lg-regular text-md-regular';

const InvalidMessageStyle = 'text-md-medium text-danger mt-2';

export function NameInput({ id, placeholder }: InputProps) {
  const { value, isInvalid, onChange, onBlur } = useValidatedInput((name) => nameRegex.test(name));

  return (
    <div>
      <input
        type="text"
        className={`${EmailInputStyle} peer ${isInvalid ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      {isInvalid && (
        <p className={InvalidMessageStyle}>
          {value.length === 0 ? '이름을 입력하세요.' : '이름은 두 글자 이상 입력해주세요.'}
        </p>
      )}
    </div>
  );
}

export function EmailInput({ id, placeholder }: InputProps) {
  const { value, isInvalid, onChange, onBlur } = useValidatedInput((email) =>
    emailRegex.test(email)
  );

  return (
    <div>
      <input
        type="email"
        className={`${EmailInputStyle} peer ${isInvalid ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      {isInvalid && (
        <p className={InvalidMessageStyle}>
          {value.length === 0 ? '이메일을 입력하세요.' : '유효한 이메일이 아닙니다.'}
        </p>
      )}
    </div>
  );
}

export function PasswordInput({ id, placeholder }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const { value, isInvalid, onChange, onBlur } = useValidatedInput((pw) => passwordRegex.test(pw));

  return (
    <div>
      <div
        className={`${BaseInputStyle} flex items-center justify-between gap-3 ${isInvalid ? 'border-red-500' : ''}`}
      >
        <input
          type={showPassword ? 'text' : 'password'}
          className={PasswordInputStyle}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
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
    </div>
  );
}

export function CurrentName({ name }: CurrentNameProp) {
  return (
    <div className={`${CurrentValueStyle} flex items-center justify-between`}>
      <div>{name}</div>
      <Button size="small">변경하기</Button>
    </div>
  );
}

export function CurrentEmail({ email }: CurrentEmailProp) {
  return <div className={`${CurrentValueStyle} flex items-center`}>{email}</div>;
}

export function CurrentPassword(props: ButtonProps) {
  return (
    <div className={`${CurrentValueStyle} flex items-center justify-between`}>
      <div>{'\u2022'.repeat(8)}</div>
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

  useClickOutside(wrapperRef, () => setIsOpen(false));

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
          isEmpty ? 'bg-gray500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover'
        }`}
      >
        <Image src="/icons/arrow_up.svg" width={16} height={16} alt="댓글 달기" />
      </button>
    </div>
  );
}

export function TextInput({ className, ...rest }: TextInputProps) {
  return <input {...rest} className={`${InputStyle} ${className ?? ''}`} />;
}

export function TextAreaInput({ height = '', ...props }: TextAreaInputProps) {
  return (
    <textarea {...props} className={`${InputStyle.replace('h-12', '')} ${height} resize-none`} />
  );
}

export function DateInput({ placeholder }: InputProps) {
  return (
    <input
      readOnly
      type="text"
      className={clsx(InputStyle, 'cursor-pointer')}
      placeholder={placeholder}
    />
  );
}
