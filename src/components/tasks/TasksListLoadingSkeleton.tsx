import React from "react";
import { StyleSheet, View } from "react-native";

export const TasksListLoadingSkeleton = () => {
  return (
    <View style={styles.root}>
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} style={styles.item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { paddingTop: 5, gap: 10 },
  item: { height: 50, backgroundColor: "#e6e6e6", borderRadius: 10 },
});
