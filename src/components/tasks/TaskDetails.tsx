import { Task } from "@/src/api/tasks/tasks";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pill } from "../shared/Pill";

interface Props {
  data: Task;
}

export const TaskDetails = (props: Props) => {
  const { data } = props;

  return (
    <View style={styles.root}>
      <DetailItem label="Title" value={data.title} />
      <DetailItem label="Description" value={data.description} />
      <DetailItem label="Planned date" value={data.planned_date} />
      <DetailItem label="Status" value={data.status} />
      <DetailItem label="Priority" value={data.priority} />
      <DetailItem label="Tags" value={<TaskTags tags={data.tags} />} />
    </View>
  );
};

interface DetailItemProps {
  label: string;
  value?: string | React.ReactNode;
}
/**
 * Task detail granular component that renders label and value
 */
const DetailItem = (props: DetailItemProps) => {
  return (
    <View>
      <Text style={styles.fieldLabel}>{props.label}</Text>
      <Text style={styles.fieldValue}>
        {props.value ? props.value : "Not set"}
      </Text>
    </View>
  );
};

interface TaskTagsProps {
  tags?: string;
}

/**
 * Component that accepts tags as string and renders them into pills
 */
const TaskTags = (props: TaskTagsProps) => {
  const tagsAsArray = props.tags
    ?.split(",") //split by comma
    .map((tag) => tag.trim()) // remove whitespaces
    .filter((tag) => !!tag); //and empty leftover tags

  return (
    <View style={styles.tags}>
      {tagsAsArray?.map((tag, idx) => <Pill key={tag + idx}>{tag}</Pill>) ?? (
        <Text style={styles.fieldValue}>Not set</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 15,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  fieldValue: {
    paddingLeft: 5,
  },
  tags: {
    flexDirection: "row",
    gap: 5,
    paddingTop: 5,
  },
});
