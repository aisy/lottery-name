import { Formik, Form, FormikValues } from 'formik';
import { FormWrapperProps, FormikChildrenFn } from '@/types/form';
import * as React from 'react';

const FormWrapper = <T extends FormikValues>({
  initialValues,
  validate,
  onSubmit,
  children,
  enableReinitialize = false,
}: FormWrapperProps<T>) => {

  return (
    <Formik<T>
      initialValues={initialValues || {}}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => (
        <Form >
          {typeof children === 'function' ? (children as FormikChildrenFn<T>)(formikProps) : children}
        </Form>
      )}

    </Formik>
  );
};

export default FormWrapper;
