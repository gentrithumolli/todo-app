import { StyleSheet, View, Text } from "react-native";
import { TasksList } from "@/src/components/tasks/TasksList";
import { DatePickerModal } from "@/src/components/shared/DatePicker";
import { measurements } from "@/src/constants/measurements";
import { useGetTasksQuery } from "@/src/api/tasks/tasks.queries";
import { useState } from "react";
import { GetTasksInput } from "@/src/api/tasks/tasks";
import { Link } from "@/src/components/shared/Link";

export default function HomeScreen() {
  const [filters, setFilters] = useState<GetTasksInput>({});
  const { data, isLoading } = useGetTasksQuery(filters);

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Tasks</Text>
      <DatePickerModal
        label="Date"
        date={filters.planned_date}
        onConfirm={(date) => setFilters({ planned_date: date })}
        style={styles.datePicker}
        placeholder="Select date"
      />
      <TasksList
        data={data}
        isLoading={isLoading}
        style={styles.listContainer}
      />
      <Link href="/tasks/add" icon="add-circle-outline">
        Add new task
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: measurements.horizontalPadding,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
  },
  datePicker: {
    marginBottom: 20,
  },
  listContainer: {
    marginBottom: 10,
  },
});
