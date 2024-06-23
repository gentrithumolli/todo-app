import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface CheckboxProps {
  label?: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
}
export const Checkbox = (props: CheckboxProps) => {
  const { label, onChange, checked, disabled } = props;

  const handleCheckboxPress = () => {
    onChange?.(!checked);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCheckboxPress} disabled={disabled}>
      <View style={styles.container}>
        <Ionicons
          name={checked ? "checkbox-outline" : "square-outline"}
          size={24}
          color={checked ? "#007bff" : "#000"}
        />
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  label: {
    marginLeft: 5,
    fontSize: 15,
  },
});
