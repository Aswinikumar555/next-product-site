import React from 'react';

interface TextInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  type = 'text',
  disabled = false,
  required = false,
}) => {
  // Clear input handler
  const handleClear = () => {
    const syntheticEvent = {
      target: {
        name,
        value: '',
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  return (
    <div className='mb-4'>
      {label && (
        <label htmlFor={name} className='block text-sm font-medium text-gray-700 mb-1'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{ color: 'black' }}
          className={`pr-10 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
          }`}
        />
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            style={{ color: 'black', marginLeft: '-12px' }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 focus:outline-none"
          >
            &times;
          </button>
        )}
      </div>
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  );
};

export default TextInput;