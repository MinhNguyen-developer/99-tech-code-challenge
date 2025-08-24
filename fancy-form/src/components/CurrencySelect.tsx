import React from 'react';
import { Select, type SelectProps } from 'antd';
import { type CurrencyOption } from '../types/currency';

interface CurrencySelectProps extends Omit<SelectProps, 'options'> {
  options: CurrencyOption[];
  placeholder?: string;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ 
  options, 
  placeholder = 'Select currency',
  ...props 
}) => {
  return (
    <Select
      placeholder={placeholder}
      options={options.map(option => ({
        value: option.value,
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
              src={option.icon} 
              alt={option.label}
              style={{ 
                width: '20px', 
                height: '20px',
                borderRadius: '50%'
              }}
              onError={(e) => {
                // Fallback for missing icons
                e.currentTarget.style.display = 'none';
              }}
            />
            <span>{option.label}</span>
            <span style={{ color: '#999', fontSize: '12px' }}>
              ${option.price.toFixed(4)}
            </span>
          </div>
        )
      }))}
      {...props}
    />
  );
};

export default CurrencySelect;
