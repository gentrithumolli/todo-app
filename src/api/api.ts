import Axios, { AxiosResponse } from "axios";
/**
 * Wrapper function for performing an API call axios
 * it concats API url from ENV with request path
 */
export async function apiRequest<D = {}, R = unknown>(
  method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch",
  path: string,
  input?: D,
  options?: any,
  params?: any
) {
  const res = await Axios.request<D, AxiosResponse<R>>({
    url: process.env.EXPO_PUBLIC_API_URL + path,
    method: method,
    data: input,
    headers: options,
    params: params,
  });
  return res.data;
}
