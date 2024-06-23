import { AxiosError } from "axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import queryKeys from "../queryKeys";

import { GetTasksInput, Task, getTaskById, getTasks } from "./tasks";

export const useGetTasksQuery = (
  params: GetTasksInput,

  options?: UseQueryOptions<any, AxiosError, Task[]>
) => {
  const { queryKey, queryFn, meta, ...rest } = { ...options };
  return useQuery({
    queryKey: queryKeys.getTasks(params),
    queryFn: async () => await getTasks(params),
    meta: { errorMessage: "Error loading tasks", ...meta },
    ...rest,
  });
};

export const useGetTaskByIdQuery = (
  id: string,
  options?: Omit<UseQueryOptions<any, AxiosError, Task>, "queryKey" | "queryFn">
) => {
  const { meta, ...rest } = { ...options };
  return useQuery({
    queryKey: queryKeys.getTaskById(id),
    queryFn: async () => await getTaskById(id),
    meta: { errorMessage: "Error loading task", ...meta },
    ...rest,
  });
};
