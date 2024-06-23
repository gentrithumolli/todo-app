import React, { PropsWithChildren } from "react";
import {
  TouchableOpacityProps,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";

interface Props extends TouchableOpacityProps {
  loading?: boolean;
}

export const Button = (props: PropsWithChildren<Props>) => {
  const { loading, style, ...rest } = props;

  const isDisabled = props.disabled || loading;
  return (
    <TouchableOpacity
      role="button"
      style={[styles.root, isDisabled && styles.disabled, style]}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.text}>{props.children}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d99ff",
    borderRadius: 10,
  },
  disabled: { opacity: 0.6, pointerEvents: "none" },
  content: {},
  text: { color: "white" },
});
