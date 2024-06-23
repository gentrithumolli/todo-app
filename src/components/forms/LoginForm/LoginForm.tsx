import React from "react";
import { useRouter } from "expo-router";
import { isAxiosError } from "axios";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

import { useSession } from "@/src/lib/context/SessionContextProvider";

import { Button } from "@/src/components/shared/Button";
import { TextInput } from "@/src/components/shared/TextInput";

import { useLoginMutation } from "@/src/api/user/user.mutations";
import { useLoginForm } from "@/src/lib/forms/login";

export const LoginForm = () => {
  const session = useSession();
  const router = useRouter();
  const { mutateAsync } = useLoginMutation();

  const form = useLoginForm({
    onSubmit: async (values) => {
      try {
        const data = await mutateAsync(values);
        await session.login(data); // save user in our session after authenticating on api
        router.navigate("/"); // navigate to home screen
      } catch (e) {
        if (isAxiosError(e)) {
          Toast.show({ type: "error", text1: e.message ?? "Couldn't log in" });
        }
      }
    },
  });

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Log in</Text>
      <TextInput
        label="Username"
        value={form.values.username}
        onChangeText={form.handleChange("username")}
        onBlur={form.handleBlur("username")}
        error={
          form.touched.username && form.errors.username
            ? form.errors.username
            : undefined
        }
        autoCorrect={false}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={form.values.password}
        onChangeText={form.handleChange("password")}
        onBlur={form.handleBlur("password")}
        autoCorrect={false}
        error={
          form.touched.password && form.errors.password
            ? form.errors.password
            : undefined
        }
        autoCapitalize="none"
        secureTextEntry
      />
      <Button
        onPress={form.submitForm}
        disabled={!form.dirty}
        loading={form.isSubmitting}
      >
        Log in
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { gap: 20 },
  heading: { fontSize: 25, fontWeight: "bold", alignSelf: "center" },
});
