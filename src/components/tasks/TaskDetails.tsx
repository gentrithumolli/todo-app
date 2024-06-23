import { Task } from "@/src/api/tasks/tasks";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pill } from "../shared/Pill";

interface Props {
  data: Task;
}

export const TaskDetails = (props: Props) => {
  const { data } = props;

  const tagsAsArray = data.tags
    ?.split(",")
    .map((tag) => tag.trim())
    .filter((tag) => !!tag);

  return (
    <View style={styles.root}>
      <DetailItem label="Title" value={data.title} />
      <DetailItem label="Description" value={data.description} />
      <DetailItem label="Planned date" value={data.planned_date} />
      <DetailItem label="Status" value={data.status} />
      <DetailItem label="Priority" value={data.priority} />
      <DetailItem
        label="Tags"
        value={
          <View style={styles.tags}>
            {tagsAsArray?.map((tag) => (
              <Pill>{tag}</Pill>
            ))}
          </View>
        }
      />
    </View>
  );
};

interface DetailItemProps {
  label: string;
  value?: string | React.ReactNode;
}
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
