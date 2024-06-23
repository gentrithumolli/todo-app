import React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { measurements } from "@/src/constants/measurements";
import { theme } from "@/src/constants/theme";
import { useSession } from "@/src/lib/context/SessionContextProvider";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export const Header = () => {
  const { logout } = useSession();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {router.canGoBack() ? (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name="arrow-back" size={25} />
          </TouchableOpacity>
        ) : (
          <View style={styles.logo}>
            <Ionicons name="document-text-outline" size={25} />
            <Text>ToDo</Text>
          </View>
        )}
        <Pressable onPress={logout}>
          <Text>Log out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.background,
    color: theme.text,
  },
  logo: { flexDirection: "row", alignItems: "center" },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: measurements.headerHeight,
    paddingHorizontal: measurements.horizontalPadding,
  },
});
