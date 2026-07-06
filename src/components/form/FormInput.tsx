import * as React from "react";
import { FormInputProps } from "@/types/form";
import { Field, FieldProps } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const FormInput: React.FunctionComponent<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  as = "input",
  options,
  className,
}) => {
  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5 my-5">
        <Label htmlFor={label}>{label}</Label>
        <Field name={name}>
          {({ field, meta }: FieldProps) => (
            <div>
              {as === "textarea" ? (
                <Textarea
                  {...field}
                  id={name}
                  placeholder={placeholder}
                  className={`h-40 field-sizing-fixed resize-y ${className}`}
                />
              ) : as === "select" && options ? (
                <select {...field} id={name}>
                  <option value="">{placeholder || "Select an option"}</option>
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
