import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Flow } from "react-native-animated-spinkit";
import { useForm, Controller } from "react-hook-form";
import { showMessage } from "react-native-flash-message";
import Button from "~/components/Button";
import Input from "~/components/Input";
import ThemeText from "~/components/ThemeText";

import { useLoginMutation } from "~/libs/mutation/auth";
import { StyleConstants } from "~/utils/theme/constants";
import { useAuthStore } from "~/utils/state/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "~/utils/helpers";
import type { RootStackScreenProps } from "~/@types/navigators";

type LoginInput = {
  email: string;
  password: string;
};

const Login: React.FC<RootStackScreenProps<"Login-Screen">> = ({
  navigation,
}) => {
  const authenticate = useAuthStore((state) => state.authenticate);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    mutation.mutate(data);
  };

  const mutation = useLoginMutation({
    onSuccess: (res) => {
      authenticate({ token: res?.token, userId: res.user._id });
      showMessage({
        message: "Login Success!",
        type: "success",
        position: "bottom",
      });
      navigation.goBack();
    },
    onError: (err) => console.log("Error", err),
  });

  return (
    <SafeAreaView
      style={[
        styles.root,
        {
          paddingBottom: 70,
        },
      ]}
    >
      <View style={styles.container}>
        <ThemeText
          fontStyle="L"
          fontWeight="Medium"
          style={{
            alignSelf: "center",
            marginBottom: StyleConstants.Spacing.M,
          }}
        >
          Welcome Back!
        </ThemeText>
        <View style={styles.inputView}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                errorText={errors.email?.message}
              />
            )}
            name="email"
          />
        </View>
        <View style={styles.inputView}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                value={value}
                onBlur={onBlur}
                secureTextEntry
                onChangeText={onChange}
                errorText={errors.password?.message}
              />
            )}
            name="password"
          />
        </View>
        <Button borderRadius={8} onPress={handleSubmit(onSubmit)}>
          {mutation.isLoading ? (
            <Flow color={"#fff"} size={38} />
          ) : (
            <ThemeText color={"#fff"} fontWeight={"Medium"}>
              Login
            </ThemeText>
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: StyleConstants.Spacing.L,
  },
  inputView: {
    marginBottom: StyleConstants.Spacing.M,
  },
});
export default Login;
