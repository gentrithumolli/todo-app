import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginResponse, User } from "@/src/api/user/user";
import { useRestoreUserFromSession } from "../hooks/useRestoreUserFromSession";

interface SessionContext {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginResponse) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const SessionContext = createContext<SessionContext>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const USER_LOCALSTORAGE_KEY = "expo-app-user"; //Local storage key to store user

export const SessionProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);

  //Try to get logged in user from storage, onSuccess set local state
  const { loading } = useRestoreUserFromSession({
    key: USER_LOCALSTORAGE_KEY,
    onSuccess: setUser,
  });

  //function to save user in our app
  const login = async (data: LoginResponse) => {
    setUser(data.user);
    await AsyncStorage.setItem(
      USER_LOCALSTORAGE_KEY,
      JSON.stringify(data.user)
    );
  };

  //remove user from app storages
  const logout = async () => {
    await AsyncStorage.removeItem(USER_LOCALSTORAGE_KEY);
    setUser(null);
  };

  const context = useMemo<SessionContext>(() => {
    return {
      user: user,
      isAuthenticated: user !== null,
      login,
      loading,
      logout,
    };
  }, [user, loading]);

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
};

/**
 * Hook that reads and provides neccessary data from session context
 */
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw Error("Must be wrapped in session provider");
  }
  return context;
};
