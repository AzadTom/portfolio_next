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
  type?:string;
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
  type= 'text'
}) => {
  return (
    <div className={wrapperClassName}>
      {labelName && (
        <Label htmlFor={labelId} className={labelClassName}>
          {labelName}
        </Label>
      )}
      <Input
       type={type}
        id={labelId}
        placeholder={placeholder}
        className={cn(inputClassName,'focus:outline-none')}
        {...register}
      />
      {isError && errorMessage && (
        <span className="text-red-400 text-sm mt-1 block outfit-300">{errorMessage}</span>
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
        <span className="text-red-400 text-sm mt-1 block outfit-300">{errorMessage}</span>
      )}
    </div>
  );
};


const inputBaseStyle = 'w-full h-[45px] px-4 py-3 outline-none outfit-400 rounded-full';
const textareatBaseStyle = 'w-full h-32 outline-none outfit-400 px-4 py-3 rounded-2xl'

export const inputStyle = `${inputBaseStyle} bg-white border border-[#787878] `;
export const textareaStyle = `${textareatBaseStyle} bg-white border border-[#787878] `;
export const inputlabelStyle = 'text-black outfit-500';
