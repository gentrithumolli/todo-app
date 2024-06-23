import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";

import { Checkbox } from "../shared/Checkbox";

import { useUpdateTaskMutation } from "@/src/api/tasks/tasks.mutation";
import { Task } from "@/src/api/tasks/tasks";
import queryKeys from "@/src/api/queryKeys";

interface Props {
  item: Task;
}

export const TaskListItem = (props: Props) => {
  const { item } = props;
  const queryClient = useQueryClient();

  const { mutateAsync } = useUpdateTaskMutation(item.id);

  /**
   * Mark task status as done when checkbox is clicked
   */
  const handleCheckboxPress = async (checked: boolean) => {
    try {
      await mutateAsync({ status: checked ? "done" : "" });
      await queryClient.invalidateQueries({ queryKey: queryKeys.getTasks() });
    } catch (e) {
      Toast.show({ type: "error", text1: "Error while updating task status" });
    }
  };
  return (
    <Link style={styles.root} href={`/tasks/${item.id}`}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.item.title}</Text>
        <Checkbox
          checked={item.status === "done"}
          onChange={handleCheckboxPress}
        />
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#dedede",
  },
  title: {
    fontWeight: "600",
    flex: 1,
    overflow: "hidden",
  },
});
