import { LoginFields } from "@/src/lib/forms/login";

export interface User {
  username: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

/**
 * This is a login api call placeholder that returns a Promise
 * and it will be resolved (when it matches the static user delclared below)
 * or rejected after 800ms.
 */
export const login = async (data: LoginFields) => {
  return new Promise<LoginResponse>((resolve, reject) => {
    setTimeout(() => {
      if (data.username === "gentrit" && data.password === "test123") {
        return resolve({
          user: { username: data.username },
          token: "123test-token321",
        });
      }
      reject({ message: "Invalid credentials" });
    }, 800);
  });
};
