import { LinkProps as ExpoLinkProps } from "expo-router/build/link/Link";
import { Link as ExpoLink } from "expo-router";
import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface LinkProps extends ExpoLinkProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconStyle?: StyleProp<TextStyle>;
}
export const Link = (props: LinkProps) => {
  const { style, icon, iconStyle, ...rest } = props;

  return (
    <ExpoLink style={[styles.root, style]} {...rest}>
      <View style={styles.container}>
        {icon && (
          <Ionicons name={icon} style={[styles.icon, iconStyle]} size={30} />
        )}
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </ExpoLink>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: "flex-start",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: 40,
    gap: 2,
  },
  text: {
    fontSize: 17,
    color: "#007bff",
  },
  icon: {
    color: "#007bff",
  },
});
