import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface InputLabelProps {
  labelId: string;
  register: UseFormRegisterReturn;
  placeholder: string;
  isError?: boolean;
  errorMessage?: string;
  labelName?: string;
  labelClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
}

const InputLabel: React.FC<InputLabelProps> = ({
  labelId,
  register,
  placeholder,
  isError = false,
  errorMessage = '',
  labelName,
  labelClassName = '',
  inputClassName = '',
  wrapperClassName = '',
}) => {
  return (
    <div className={wrapperClassName}>
      {labelName && (
        <Label htmlFor={labelId} className={labelClassName}>
          {labelName}
        </Label>
      )}
      <Input
        id={labelId}
        placeholder={placeholder}
        className={cn(inputClassName,'focus:outline-none')}
        {...register}
      />
      {isError && errorMessage && (
        <span className="text-red-400 text-sm mt-1 block">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputLabel;


export const TextAreaLabel: React.FC<InputLabelProps> = ({
  labelId,
  register,
  placeholder,
  isError = false,
  errorMessage = '',
  labelName,
  labelClassName = '',
  inputClassName = '',
  wrapperClassName = '',
}) => {
  return (
    <div className={wrapperClassName}>
      {labelName && (
        <Label htmlFor={labelId} className={labelClassName}>
          {labelName}
        </Label>
      )}
      <textarea
        id={labelId}
        placeholder={placeholder}
        className={cn(inputClassName,'focus:outline-none')}
        {...register}
      />
      {isError && errorMessage && (
        <span className="text-red-400 text-sm mt-1 block">{errorMessage}</span>
      )}
    </div>
  );
};


export const inputStyle = 'w-full rounded-full px-4 h-[45px] outline-none outfit-400';
export const textareaStyle = 'outfit-400 w-full px-4 py-3 h-32 bg-white border border-[#737373]  text-black rounded-2xl focus:outline-none  resize-none';
