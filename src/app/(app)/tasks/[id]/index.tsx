import { useGlobalSearchParams, useRouter } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { useDeleteTaskMutation } from "@/src/api/tasks/tasks.mutation";
import { useGetTaskByIdQuery } from "@/src/api/tasks/tasks.queries";
import queryKeys from "@/src/api/queryKeys";

import { LoadingContainer } from "@/src/components/LoadingContainer/LoadingContainer";
import { Button } from "@/src/components/shared/Button";
import { TaskDetails } from "@/src/components/tasks/TaskDetails";
import { measurements } from "@/src/constants/measurements";

export default function TaskDetailsScreen() {
  const params = useGlobalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetTaskByIdQuery(params.id ?? "");

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Task details</Text>
      <LoadingContainer when={isLoading}>
        {data && (
          <>
            <TaskDetails data={data} />
            <TaskActions id={params.id} />
          </>
        )}
      </LoadingContainer>
    </View>
  );
}

interface TaskActionsProps {
  id?: string;
}
/**
 *  Component that holds edit and delete action buttons
 */
const TaskActions = (props: TaskActionsProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync } = useDeleteTaskMutation();

  if (!props.id) {
    return null;
  }
  /**
   * Navigate user to edit screen
   */
  const handleEditPress = () => {
    router.navigate(`/tasks/${props.id}/edit`);
  };

  /**
   * Remove task from DB
   */
  const handleDeletePress = async () => {
    /**
     * Ask for confirmation before deleting task
     */
    Alert.alert("Confirm", "Are you sure you want to delete?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: removeTaskFromDB },
    ]);

    async function removeTaskFromDB() {
      try {
        await mutateAsync(props.id ?? "");
        Toast.show({
          type: "success",
          text1: "Task deleted successfully",
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.getTasks(),
        });
        router.navigate("/");
      } catch (e) {
        Toast.show({ type: "error", text1: "Error, please try again" });
      }
    }
  };

  return (
    <View style={styles.taskActionsContainer}>
      <Button style={styles.button} onPress={handleEditPress}>
        Edit
      </Button>
      <Button
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeletePress}
      >
        Delete
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: measurements.horizontalPadding,
    paddingTop: 15,
  },
  heading: { fontSize: 20, fontWeight: "semibold", marginBottom: 10 },
  taskActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    marginTop: 15,
    paddingTop: 15,
    gap: 15,
  },
  button: {
    alignSelf: "flex-start",
    maxWidth: 100,
  },
  deleteButton: {
    backgroundColor: "red",
  },
});
