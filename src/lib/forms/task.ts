import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

export interface TaskFormFields {
  title: string;
  description?: string;
  planned_date: string;
  status?: string;
  priority?: string;
  tags?: string;
}

interface TaskFormOptions {
  initialValues?: TaskFormFields;
  onSubmit: (
    values: TaskFormFields,
    formikHelpers: FormikHelpers<TaskFormFields>
  ) => Promise<void>;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  planned_date: Yup.string().required("Scheduled date is required"),
  description: Yup.string(),
  status: Yup.string(),
  priority: Yup.string(),
  tags: Yup.string(),
});

export const useTaskForm = (options: TaskFormOptions) =>
  useFormik<TaskFormFields>({
    initialValues: {
      title: "",
      description: "",
      planned_date: "",
      status: "",
      priority: "",
      tags: "",
      ...options.initialValues,
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) =>
      await options.onSubmit(values, formikHelpers),
  });

export type TaskFormType = ReturnType<typeof useTaskForm>;
