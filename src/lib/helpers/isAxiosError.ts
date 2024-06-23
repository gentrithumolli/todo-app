import { AxiosError } from "axios";

/**
 * Type-guard function to determine whether error given is an axios error type
 */
export const isAxiosError = <T = any>(err: unknown): err is AxiosError<T> => {
  return (
    typeof err === "object" &&
    err !== null &&
    Boolean((err as AxiosError).isAxiosError)
  );
};
