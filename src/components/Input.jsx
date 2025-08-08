import React, { useState, useCallback } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  name,
  label,
  disabled = false,
  ...rest
}) => {
  const [inputType, setInputType] = useState(type);

  const toggleVisibility = useCallback(() => {
    if (type === 'password' && !disabled) {
      setInputType(prev => (prev === 'password' ? 'text' : 'password'));
    }
  }, [type, disabled]);

  const inputId = name ? `input-${name}` : undefined;

  return (
    <div style={{ marginBottom: '16px', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '6px',
            display: 'block',
            color: '#333',
          }}
        >
          {label}
        </label>
      )}

      <div style={{ position: 'relative', width: '100%' }}>
        <input
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          autoComplete="off"
          style={{
            width: '100%',
            padding: '8px 40px 8px 12px', // left and right padding for icon
            fontSize: '15px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: disabled ? '#f3f4f6' : '#fff',
            color: disabled ? '#888' : '#000',
            outline: 'none',
            transition: 'border 0.2s, box-shadow 0.2s',
          }}
          onFocus={(e) =>
            (e.target.style.boxShadow = '0 0 0 2px rgba(59,130,246,0.3)')
          }
          onBlur={(e) => (e.target.style.boxShadow = 'none')}
          {...rest}
        />

        {type === 'password' && (
          <span
            onClick={toggleVisibility}
            role="button"
            aria-label={inputType === 'password' ? 'Show password' : 'Hide password'}
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              fontSize: '18px',
              color: disabled ? '#a5b4fc' : '#3b82f6',
              cursor: disabled ? 'not-allowed' : 'pointer',
              userSelect: 'none',
            }}
            onMouseOver={(e) => {
              if (!disabled) e.currentTarget.style.color = '#2563eb';
            }}
            onMouseOut={(e) => {
              if (!disabled) e.currentTarget.style.color = '#3b82f6';
            }}
          >
            {inputType === 'password' ? <FaEye /> : <FaEyeSlash />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
