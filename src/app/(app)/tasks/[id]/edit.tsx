import { EditTaskForm } from "@/src/components/forms/TaskForm/EditTaskForm";
import { measurements } from "@/src/constants/measurements";
import { useGlobalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function EditTaskScreen() {
  const params = useGlobalSearchParams<{ id: string }>();

  return (
    <View style={styles.root}>
      <EditTaskForm id={params.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: measurements.horizontalPadding,
    paddingTop: 15,
  },
});
