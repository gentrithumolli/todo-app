import { Header } from "@/src/components/layout/Header";
import { useSession } from "@/src/lib/context/SessionContextProvider";
import { Redirect, SplashScreen, Stack } from "expo-router";
import React from "react";

/**
 * Main layout component for authenticated routes.
 *
 * This acts like a shield for unauthorized users
 * by redirecting them to login screen.
 */
export default function AppLayout() {
  const { isAuthenticated, loading } = useSession();

  //keep splash screen on while checking for user in storage
  if (loading) {
    return SplashScreen.preventAutoHideAsync();
  }

  //redirect unauthorized users to login screen
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }
  return (
    <>
      <Header />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
