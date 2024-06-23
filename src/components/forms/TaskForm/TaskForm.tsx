import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FormikHelpers } from "formik";

import { Button } from "@/src/components/shared/Button";
import { DatePickerModal } from "@/src/components/shared/DatePicker";
import { SelectInput } from "@/src/components/shared/SelectInput";
import { TextInput } from "@/src/components/shared/TextInput";

import {
  taskPriorityOptions,
  taskStatusOptions,
} from "@/src/constants/selectOptions";
import { TaskFormFields, useTaskForm } from "@/src/lib/forms/task";

interface Props {
  heading?: string;
  initialValues?: TaskFormFields;
  onSubmit: (
    values: TaskFormFields,
    formHelpers: FormikHelpers<TaskFormFields>
  ) => Promise<void>;
}

export const TaskForm = (props: Props) => {
  const { heading, initialValues, onSubmit } = props;

  const form = useTaskForm({
    initialValues,
    onSubmit,
  });

  /**
   * Curried function to handle field changes.
   * Currently used only for date and select pickers
   * because of the change function types and in order to handle blur
   */
  const handleFieldChange =
    (field: keyof TaskFormFields) => (value?: string | null) => {
      form.setFieldValue(field, value ?? "");
      form.setFieldTouched(field);
    };

  //Grouped errors
  const errors = {
    title:
      form.touched.title && form.errors.title ? form.errors.title : undefined,
    description:
      form.touched.description && form.errors.description
        ? form.errors.description
        : undefined,
    planned_date:
      form.touched.planned_date && form.errors.planned_date
        ? form.errors.planned_date
        : undefined,
    status:
      form.touched.status && form.errors.status
        ? form.errors.status
        : undefined,
    priority:
      form.touched.priority && form.errors.priority
        ? form.errors.priority
        : undefined,
    tags: form.touched.tags && form.errors.tags ? form.errors.tags : undefined,
  };
  return (
    <View>
      {heading && <Text style={styles.heading}>{heading}</Text>}
      <View style={styles.formContainer}>
        <TextInput
          label="Title"
          value={form.values.title}
          onChangeText={form.handleChange("title")}
          onBlur={form.handleBlur("title")}
          error={errors.title}
          autoCorrect={false}
        />
        <TextInput
          label="Description"
          value={form.values.description}
          onChangeText={form.handleChange("description")}
          onBlur={form.handleBlur("description")}
          error={errors.description}
          autoCorrect={false}
          multiline
        />
        <DatePickerModal
          label="Planned date"
          date={form.values.planned_date}
          onConfirm={handleFieldChange("planned_date")}
          error={errors.planned_date}
        />

        <SelectInput
          label="Status"
          items={taskStatusOptions}
          value={form.values.status ?? ""}
          onValueChange={handleFieldChange("status")}
          error={errors.status}
        />
        <SelectInput
          label="Priority"
          items={taskPriorityOptions}
          value={form.values.priority ?? ""}
          onValueChange={handleFieldChange("priority")}
          error={errors.priority}
        />
        <TextInput
          label="Tags"
          placeholder="Comma separated (e.g. tag1, tag2, tag3)"
          value={form.values.tags}
          onChangeText={form.handleChange("tags")}
          onBlur={form.handleBlur("tags")}
          error={errors.tags}
          autoCorrect={false}
          multiline
        />
        <Button
          onPress={form.submitForm}
          loading={form.isSubmitting}
          disabled={!form.dirty}
        >
          SUBMIT
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: { fontSize: 20, fontWeight: "semibold", marginBottom: 10 },
  formContainer: { gap: 10 },
});
