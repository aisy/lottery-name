import { FormikProps, FormikValues, FormikHelpers } from "formik";
import { ReactNode } from "react";

export type FormikChildrenFn<T extends FormikValues> = (
  props: FormikProps<T>
) => ReactNode;

export interface FormWrapperProps<T extends FormikValues = FormikValues> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => Promise<void> | void;
  children: (props: FormikProps<T>) => React.ReactNode;
  enableReinitialize?: boolean;
}

export interface FormInputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  as?: "input" | "textarea" | "select";
  options?: { value: string | number; label: string }[];
  rows?: number;
}

export interface FormSelectOption {
  value: string | number;
  label: string;
}

export interface FormSelectProps {
  label?: string;
  name: string;
  options: FormSelectOption[];
  placeholder?: string;
  [key: string]: unknown;
}

export interface FormSubmitProps {
  children: React.ReactNode;
  isSubmitting?: boolean;
  className?: string;
}
