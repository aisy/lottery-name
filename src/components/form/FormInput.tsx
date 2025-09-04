import * as React from 'react';
import { FormInputProps } from '@/types/form';
import { Field, FieldProps } from 'formik';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const FormInput: React.FunctionComponent<FormInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  as = 'input',
  options,
  rows = 3
}) => {

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={label}>{label}</Label>
        <Field name={name}>
          {({ field, meta }: FieldProps) => (
            <div>
              {
                as === 'textarea' ? (
                  <textarea
                    {...field}
                    id={name}
                    placeholder={placeholder}
                    rows={rows}
                  />
                ) : as === 'select' && options ? (
                  <select {...field} id={name} >
                    <option value="">{placeholder || 'Select an option'}</option>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    {...field}
                    id={name}
                    type={type}
                    placeholder={placeholder}
                  />
                )}
              {meta.touched && meta.error && (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
              )}
            </div>
          )}
        </Field>
      </div>
    </div>
  );
};

export default FormInput;
