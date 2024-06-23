import { TaskFormFields } from "@/src/lib/forms/task";
import { apiRequest } from "../api";
import { Optional } from "@tanstack/react-query";

export interface Task {
  id: string;
  title: string;
  status?: string;
  planned_date: string;
  description?: string;
  priority?: string;
  tags?: string;
}

export interface GetTasksInput {
  planned_date?: string;
}

export const getTasks = async (params?: GetTasksInput) => {
  return await apiRequest<GetTasksInput, Task[]>(
    "get",
    "/tasks",
    undefined,
    undefined,
    params
  );
};

export const createTask = async (data: TaskFormFields) => {
  return await apiRequest<TaskFormFields>("post", "/tasks", data);
};

export const getTaskById = async (id: string) => {
  return await apiRequest<string, Task>("get", `/tasks/${id}`);
};

export const updateTaskById = async (
  id: string,
  data: Optional<TaskFormFields, "title" | "planned_date">
) => {
  return await apiRequest("patch", `/tasks/${id}`, data);
};

export const deleteTaskById = async (id: string) => {
  return await apiRequest("delete", `/tasks/${id}`);
};
