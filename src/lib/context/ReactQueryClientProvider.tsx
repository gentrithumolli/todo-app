import { PropsWithChildren } from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Toast from "react-native-toast-message";

/*
 * Create react query client instance and handle query errors globally.
 * Error message can be set when calling useQuery functions by using
 * meta -> errorMessage property in options parameter
 */
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_, query) => {
      const message = query.meta?.errorMessage as string | undefined;

      Toast.show({
        type: "error",
        text1: message ?? "Something went wrong",
      });
    },
  }),
});

export const ReactQueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
