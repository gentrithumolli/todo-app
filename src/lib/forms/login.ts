import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

export interface LoginFields {
  username: string;
  password: string;
}

interface LoginFormOptions {
  initialValues?: LoginFields;
  onSubmit: (
    values: LoginFields,
    formikHelpers: FormikHelpers<LoginFields>
  ) => Promise<void>;
}
const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

/**
 * Abstraction layer of useFormik hook specific for login use
 */
export const useLoginForm = (options: LoginFormOptions) =>
  useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: loginSchema,
    onSubmit: async (values, formikHelpers) =>
      await options.onSubmit(values, formikHelpers),
  });

export type LoginFormik = ReturnType<typeof useLoginForm>;
