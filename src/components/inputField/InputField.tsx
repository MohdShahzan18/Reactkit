import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineClose } from 'react-icons/ai';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  type?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  type = 'text',
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  clearable = false,
  isPassword = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Tailwind size classes
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-sm' :
                    size === 'lg' ? 'px-4 py-3 text-lg' :
                    'px-3 py-2 text-base';

  // Tailwind variant classes
  const variantClass = variant === 'filled' ? 'bg-gray-100 border border-gray-300' :
                       variant === 'ghost' ? 'bg-transparent border-b border-gray-300' :
                       'border border-gray-300 bg-white';

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: '' } } as any);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full my-2">
      {label && <label className="font-medium">{label}</label>}

      <div className="relative w-full">
        <input
          value={value}
          onChange={onChange}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full ${sizeClass} ${variantClass} rounded
            ${invalid ? 'border-red-500' : ''}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
            pr-10
          `}
        />

        {/* Clear button */}
        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600"
          >
            <AiOutlineClose size={20} />
          </button>
        )}

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        )}
      </div>

      {/* Helper/Error Text */}
      {helperText && !invalid && (
        <span className="text-sm text-gray-500">{helperText}</span>
      )}
      {invalid && errorMessage && (
        <span className="text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;