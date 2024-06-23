import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";

import { SessionProvider } from "@/src/lib/context/SessionContextProvider";
import { ReactQueryClientProvider } from "@/src/lib/context/ReactQueryClientProvider";
import configureDayjs from "@/src/lib/helpers/configureDayjs";

//Load dayjs configuration
configureDayjs();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return (
    <ReactQueryClientProvider>
      <SessionProvider>
        <Slot />
        <Toast autoHide visibilityTime={3000} position="bottom" />
      </SessionProvider>
    </ReactQueryClientProvider>
  );
}
