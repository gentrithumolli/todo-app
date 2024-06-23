import { theme } from "@/src/constants/theme";
import React from "react";
import {
  View,
  Text,
  TextInput as NativeTextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const TextInput = (props: InputProps) => {
  const { label, error, ...rest } = props;
  return (
    <View style={styles.root}>
      {label && <Text style={styles.label}>{label}</Text>}
      <NativeTextInput
        style={[
          styles.input,
          !!error && styles.error,
          props.multiline && styles.multiline,
        ]}
        {...rest}
      />
      {error && <Text style={styles.errorLabel}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { width: "100%" },
  label: {
    fontSize: 13,
    marginBottom: 2,
    marginLeft: 5,
    color: theme.greyDarker,
  },

  input: {
    height: 40,
    borderColor: theme.grey,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "100%",
    fontSize: 15,
  },
  error: {
    color: theme.red,
    borderColor: theme.red,
  },
  errorLabel: {
    marginTop: 2,
    color: theme.red,
    fontSize: 13,
    marginLeft: 5,
  },
  multiline: {
    height: 100,
  },
});
