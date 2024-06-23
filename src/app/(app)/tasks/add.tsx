import { AddTaskForm } from "@/src/components/forms/TaskForm/AddTaskForm";
import { measurements } from "@/src/constants/measurements";
import { StyleSheet, View } from "react-native";

export default function AddNewTaskScreen() {
  return (
    <View style={styles.root}>
      <AddTaskForm />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: measurements.horizontalPadding,
    paddingTop: 15,
  },
});
