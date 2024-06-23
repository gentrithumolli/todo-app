import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

import { TaskFormFields } from "@/src/lib/forms/task";
import { useCreateTaskMutation } from "@/src/api/tasks/tasks.mutation";
import { TaskForm } from "./TaskForm";
import queryKeys from "@/src/api/queryKeys";

/**
 * Abstraction layer of TaskForm component that creates a new task on DB.
 */
export const AddTaskForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync } = useCreateTaskMutation();

  /**
   * Handle create form submittion
   */
  const handleSubmit = async (values: TaskFormFields) => {
    try {
      await mutateAsync(values);
      Toast.show({ type: "success", text1: "Task created successfully" });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getTasks(),
        refetchType: "all",
      });
      router.navigate("/");
    } catch (e) {
      Toast.show({ type: "error", text1: "Error, please try again" });
    }
  };

  return (
    <View>
      <TaskForm heading="Add new task" onSubmit={handleSubmit} />
    </View>
  );
};
