import { MutationOptions, Optional, useMutation } from "@tanstack/react-query";
import { TaskFormFields } from "@/src/lib/forms/task";
import { createTask, deleteTaskById, updateTaskById } from "./tasks";

type CreateTaskOptions = Omit<
  MutationOptions<any, any, TaskFormFields>,
  "mutationFn"
>;
export const useCreateTaskMutation = (options?: CreateTaskOptions) => {
  return useMutation({
    mutationFn: createTask,
    ...options,
  });
};

type UpdateTaskOptions = Omit<
  MutationOptions<any, any, Optional<TaskFormFields, "title" | "planned_date">>,
  "mutationFn"
>;
export const useUpdateTaskMutation = (
  id: string,
  options?: UpdateTaskOptions
) => {
  return useMutation({
    mutationFn: (data) => updateTaskById(id, data),
    ...options,
  });
};

type DeleteTaskOptions = Omit<MutationOptions<any, any, any>, "mutationFn">;
export const useDeleteTaskMutation = (options?: DeleteTaskOptions) => {
  return useMutation({
    mutationFn: deleteTaskById,
    ...options,
  });
};
