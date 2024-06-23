import { MutationOptions, useMutation } from "@tanstack/react-query";
import { LoginResponse, login } from "./user";
import { LoginFields } from "@/src/lib/forms/login";

/**
 * Interface for login query options
 * (mutationFn is removed from type since we're explicitly using this mutation for logging in)
 */
type Options = Omit<
  MutationOptions<LoginResponse, any, LoginFields>,
  "mutationFn"
>;

export const useLoginMutation = (options?: Options) => {
  return useMutation({
    mutationFn: login,
    ...options,
  });
};
