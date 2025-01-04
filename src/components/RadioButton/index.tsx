import React, { useState, useEffect } from 'react';
import { CustomLabel, RadioView, RadioWrap } from './RadioButton.styled';
import SvgIcon from '@components/SvgIcon';
import { EColor } from '@styles/color';
import { RadioItem } from '@type/index';

interface RadioButtonProps {
  items: RadioItem[];
  initialValue: number;
  onChange: (newValue: number) => void;
}

const RadioButton = ({ items, initialValue, onChange }: RadioButtonProps) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <RadioWrap>
      {items.map((item) => (
        <CustomLabel key={item.value}>
          <input
            type="radio"
            name="customRadio"
            value={item.value}
            onChange={handleChange}
            checked={item.value === selectedValue}
          />
          <RadioView isSelected={item.value === selectedValue}>
            <SvgIcon
              name={'check'}
              width={28}
              height={28}
              fill={item.value === selectedValue ? EColor.COLOR_PRIMARY : EColor.TEXT_500}
            />
            {item.text}
          </RadioView>
        </CustomLabel>
      ))}
    </RadioWrap>
  );
};

export default RadioButton;