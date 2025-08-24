import { useState } from 'react';
import type { InputFieldProps } from './InputField';
import InputField from './InputField';

export default {
  title: 'Components/InputField',
  component: InputField,
};

export const Default = (args: InputFieldProps) => {
  const [value, setValue] = useState('');
  return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

Default.args = {
  label: 'Your Name',
  placeholder: 'Enter Name',
  helperText: 'This will be visible to others',
  variant: 'outlined',
  clearable: true,
  type: 'text',
};

export const PasswordField = (args: InputFieldProps) => {
  const [value, setValue] = useState('');
  return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} isPassword />;
};

PasswordField.args = {
  label: 'Password',
  placeholder: 'Enter Password',
  helperText: 'Use at least 8 characters',
  variant: 'outlined',
};
