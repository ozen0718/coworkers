import React from 'react';
import clsx from 'clsx';

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string | null;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function FormField({
  id,
  label,
  value,
  error,
  placeholder,
  onChange,
}: FormFieldProps) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="text-lg-medium mb-2 block">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder={placeholder}
        className={clsx(
          'bg-bg100 text-lg-regular h-12 w-full rounded-xl border px-4 focus:outline-none',
          {
            'border-danger': !!error,
            'border-gray100/10 focus:border-primary hover:border-primary-hover': !error,
          }
        )}
      />
      {error && <p className="text-danger text-sm-medium mt-1">{error}</p>}
    </div>
  );
}
