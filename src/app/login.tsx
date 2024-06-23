import { LoginForm } from "@/src/components/forms/LoginForm/LoginForm";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  return (
    <SafeAreaView style={style.root}>
      <LoginForm />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
});
