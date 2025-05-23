import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;

  error?: string | null;

  onValueChange: (value: string) => void;
}

export default function FormField({
  id,
  label,
  error,
  className,
  onValueChange,
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="text-lg-medium mb-2 block">
        {label}
      </label>
      <input
        id={id}
        {...inputProps}
        onChange={(e) => onValueChange(e.currentTarget.value)}
        className={clsx(
          'bg-bg100 text-lg-regular h-12 w-full rounded-xl border px-4 focus:outline-none',
          {
            'border-danger': !!error,
            'border-gray100/10 focus:border-primary hover:border-primary-hover': !error,
          },
          className
        )}
      />
      {error && <p className="text-danger text-sm-medium mt-1">{error}</p>}
    </div>
  );
}
