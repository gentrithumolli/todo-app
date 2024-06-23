import { theme } from "@/src/constants/theme";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

export const Pill = (props: PropsWithChildren) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: theme.grey,
    alignSelf: "flex-start",
    borderRadius: 25,
  },
  text: {
    fontWeight: "600",
    color: "white",
  },
});
