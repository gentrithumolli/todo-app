import React, { PropsWithChildren } from "react";
import { ActivityIndicator, View } from "react-native";

interface Props {
  when?: boolean;
  placeholder?: React.ReactNode;
}
/**
 * Show a placeholder while loading loading data
 */
export const LoadingContainer = (props: PropsWithChildren<Props>) => {
  if (props.when) {
    //Render placeholder if it's provided
    if (props.placeholder) {
      return <>{props.placeholder}</>;
    }
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return <>{props.children}</>;
};
