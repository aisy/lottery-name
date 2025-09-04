// components/Form/SubmitButton.tsx
import { useFormikContext } from 'formik';
import React from 'react';
import { FormSubmitProps } from '@/types/form';

const SubmitForm: React.FC<FormSubmitProps> = ({
  children,
  isSubmitting: propIsSubmitting,
  className = 'btn btn-primary'
}) => {
  const formikContext = useFormikContext();
  const isSubmitting = propIsSubmitting !== undefined ? propIsSubmitting : formikContext.isSubmitting;

  return (
    <button
      type="submit"
      className={className}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Memproses...' : children}
    </button>
  );
};

export default SubmitForm;