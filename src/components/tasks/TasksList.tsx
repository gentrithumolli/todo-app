import React from "react";
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { TaskListItem } from "./TaskListItem";
import { LoadingContainer } from "../LoadingContainer/LoadingContainer";
import { TasksListLoadingSkeleton } from "./TasksListLoadingSkeleton";
import { Task } from "@/src/api/tasks/tasks";

interface Props {
  style?: StyleProp<ViewStyle>;
  data?: Task[];
  isLoading?: boolean;
}

export const TasksList = (props: Props) => {
  return (
    <View style={[styles.root, [props.style]]}>
      <Text style={styles.heading}>List</Text>
      <LoadingContainer
        when={props.isLoading}
        placeholder={<TasksListLoadingSkeleton />}
      >
        <FlatList
          contentContainerStyle={styles.list}
          data={props.data}
          renderItem={({ item }) => <TaskListItem item={item} />}
          ListEmptyComponent={<Text>No data found!</Text>}
          keyExtractor={(item) => item.id}
        />
      </LoadingContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flexShrink: 1 },
  heading: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  list: {
    marginTop: 5,
    gap: 10,
  },
});
