import { Slider } from "../ui/slider";
import { FormSliderProps } from "../../types/form";
import { FC } from "react";
import { Label } from "../ui/label";
import { Field, FieldProps } from "formik";

const SliderUsable: FC<FormSliderProps> = ({
  min,
  max,
  step,
  label,
  name,
  onChange,
}) => {
  return (
    <div>
      <Label htmlFor={label}>{label}</Label>
      <Field name={name}>
        {({ field, meta, form }: FieldProps) => (
          <div>
            <div className="flex items-center gap-4">
              <Slider
                name={field.name}
                value={field.value || [0]}
                max={max ?? 100}
                min={min ?? 0}
                step={step}
                className="mx-auto w-full max-w-xs"
                onValueChange={(newValue) => {
                  form.setFieldValue(field.name, newValue);
                  onChange?.(newValue);
                }}
                onBlur={field.onBlur}
                onPointerDown={(e) => e.stopPropagation()}
              />
              <span className="text-sm font-medium min-w-8 text-center">
                {field.value?.[0] ?? 0} detik
              </span>
            </div>
            {meta.touched && meta.error && (
              <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export default SliderUsable;
