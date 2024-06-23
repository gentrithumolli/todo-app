import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "@/src/constants/theme";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";

interface SelectInputProps extends PickerSelectProps {
  label?: string;
  error?: string;
}

export const SelectInput = (props: SelectInputProps) => {
  const { label, error, ...rest } = props;

  return (
    <View style={styles.root}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.input, !!error && styles.error]}>
        <RNPickerSelect style={styles.picker} {...rest} />
      </View>
      {error && <Text style={styles.errorLabel}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { width: "100%", height: 60 },
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
    justifyContent: "center",
  },
  error: {
    borderColor: theme.red,
  },
  errorLabel: {
    marginTop: 2,
    color: theme.red,
    fontSize: 13,
    marginLeft: 5,
  },
  picker: {},
});
