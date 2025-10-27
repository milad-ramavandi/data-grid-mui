import { useFormik, type FormikErrors, type FormikTouched } from "formik";
import * as Yup from "yup";
import type { JSX } from "react";

interface RenderFormProps<T> {
  values: T;
  touched: FormikTouched<T>;
  errors: FormikErrors<T>;
  isSubmitting:boolean,
  getFieldProps: (name: string) => Yup.AnyObject;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void> | Promise<FormikErrors<T>>,
  setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => Promise<void> | Promise<FormikErrors<T>>
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void,
  
}

interface Props<T extends Yup.AnyObject> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<T>;
  onSubmit: (values: T) => Promise<void>;
  render: (form: RenderFormProps<T>) => JSX.Element
}

const FormTemplate = <T extends Yup.AnyObject>({
  initialValues,
  validationSchema,
  onSubmit,
  render,
}: Props<T>) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return render(formik);
};

export default FormTemplate;
