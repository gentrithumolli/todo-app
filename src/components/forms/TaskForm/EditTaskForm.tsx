import React from "react";
import { TaskForm } from "./TaskForm";
import { TaskFormFields } from "@/src/lib/forms/task";
import { useGetTaskByIdQuery } from "@/src/api/tasks/tasks.queries";
import { ActivityIndicator, View } from "react-native";
import { useUpdateTaskMutation } from "@/src/api/tasks/tasks.mutation";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

interface Props {
  id?: string;
}
/**
 * Abstraction layer of TaskForm component.
 * It accepts task ID as prop and fills out the form after loading
 * task data from API and handling edit action.
 */
export const EditTaskForm = (props: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useGetTaskByIdQuery(props.id ?? "", {
    enabled: !!props.id,
  });
  const { mutateAsync } = useUpdateTaskMutation(props.id ?? "");

  const handleEditSubmit = async (values: TaskFormFields) => {
    try {
      await mutateAsync(values);
      Toast.show({ type: "success", text1: "Task edited successfully" });
      queryClient.invalidateQueries({ refetchType: "all" });
      router.navigate("/");
    } catch (e) {
      Toast.show({ type: "error", text1: "Error, please try again" });
    }
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <TaskForm
      heading="Edit task"
      onSubmit={handleEditSubmit}
      initialValues={data}
    />
  );
};
