import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "@/src/api/user/user";

interface Options {
  key: string;
  onSuccess?: (user: User) => void;
  onError?: (error: unknown) => void;
}

/**
 *  Check if theres an active user stored in out async storage
 * and fire onSuccess (or onError) providing the logged in user as argument.
 */
export const useRestoreUserFromSession = (options: Options) => {
  const [loading, setLoading] = useState(true);

  const checkUserInSession = useCallback(async () => {
    try {
      const userInStorage = await AsyncStorage.getItem(options.key);
      if (!userInStorage) {
        setLoading(false);
        return;
      }
      const user = JSON.parse(userInStorage);
      options.onSuccess?.(user);
    } catch (e) {
      console.error("couldn't login", e);
      options.onError?.(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUserInSession();
  }, []);
  return { loading };
};
