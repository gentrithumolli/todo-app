import { theme } from "@/src/constants/theme";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DatePicker, { DatePickerProps } from "react-native-date-picker";

import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import { DEFAULT_DATE_FORMAT } from "@/src/lib/helpers/configureDayjs";

export interface DatePickerModalProps
  extends Omit<DatePickerProps, "modal" | "date" | "onConfirm"> {
  date?: string;
  onConfirm: (date?: string) => void;
  label?: string;
  placeholder?: string;
  format?: string;
  error?: string;
}

export const DatePickerModal = (props: DatePickerModalProps) => {
  //prettier-ignore
  const { date, onConfirm, onCancel, placeholder, label, style,format, error, ...rest } = props;
  const dateFormat = format ?? DEFAULT_DATE_FORMAT;

  const [open, setOpen] = useState(false);
  const openPickerModal = () => setOpen(true);
  const closePickerModal = () => setOpen(false);

  const handleConfirmPress = (date: Date) => {
    closePickerModal();
    onConfirm?.(dayjs(date).format(dateFormat));
  };

  const handleCancelPress = () => {
    closePickerModal();
    onCancel?.();
  };

  const handleIconPress = () => {
    //If there's date, it means user is trying to clear the value
    if (date) {
      return onConfirm(undefined);
    }
    //Otherwise, open datepicker modal
    openPickerModal();
  };

  const dateLabel = date
    ? dayjs(date, dateFormat).format(dateFormat)
    : placeholder;

  const dateObject = date ? dayjs(date, dateFormat).toDate() : new Date();

  return (
    <View style={[styles.root, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.dateDisplay, !!error && styles.error]}
        onPress={openPickerModal}
      >
        <Text style={styles.dateText}>{dateLabel}</Text>

        <TouchableOpacity onPress={handleIconPress}>
          <Ionicons
            name={date ? "close-outline" : "calendar-clear-outline"}
            size={24}
            color={theme.greyDarker}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={dateObject}
        onConfirm={handleConfirmPress}
        onCancel={handleCancelPress}
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
  dateDisplay: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 10,
    alignItems: "center",
    gap: 5,
  },
  dateText: {
    fontSize: 15,
    color: "#000",
    flex: 1,
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
});
