import { GetTasksInput } from "./tasks/tasks";
/**
 * This is a centralized way of handling reqact query keys that help us keep track
 * of cached data and also invalidate queries when performing certain actions.
 *
 * Each function declared here exists as an API call function here in api folder
 */
//prettier-ignore
export default {
  getTasks: (params?: GetTasksInput) => ["get-tasks-by-date", ...(params ? [JSON.stringify(params)]:[])],
  getTaskById: (id: string) => ["get-task-by-id", id],
};
