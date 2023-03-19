import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Flow } from "react-native-animated-spinkit";
import { useForm, Controller } from "react-hook-form";
import { showMessage } from "react-native-flash-message";
import Button from "~/components/Button";
import Input from "~/components/Input";
import ThemeText from "~/components/ThemeText";

import { useRegisterEmailMutation } from "~/libs/mutation/auth";
import { StyleConstants } from "~/utils/theme/constants";
import { useAuthStore } from "~/utils/state/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "~/utils/helpers";
import type { RootStackScreenProps } from "~/@types/navigators";

type RegisterInput = {
  fullname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const Register: React.FC<RootStackScreenProps<"Register-Screen">> = ({
  navigation,
}) => {
  const authenticate = useAuthStore((state) => state.authenticate);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    const { passwordConfirmation, ...rest } = data;

    console.log(JSON.stringify(rest, null, 2))
    mutation.mutate(rest);
  };

  const mutation = useRegisterEmailMutation({
    onSuccess: (res) => {
      authenticate({ token: res?.token, userId: res.user._id });
      showMessage({
        message: "Your account is created successfully!",
        type: "success",
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
          Create a new account
        </ThemeText>
        <View style={styles.inputView}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Fullname"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                errorText={errors.fullname?.message}
              />
            )}
            name="fullname"
          />
        </View>
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
        <View style={styles.inputView}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirm Password"
                value={value}
                onBlur={onBlur}
                secureTextEntry
                onChangeText={onChange}
                errorText={errors.passwordConfirmation?.message}
              />
            )}
            name="passwordConfirmation"
          />
        </View>
        <Button borderRadius={8} onPress={handleSubmit(onSubmit)}>
          {mutation.isLoading ? (
            <Flow color={"#fff"} size={38} />
          ) : (
            <ThemeText color={"#fff"} fontWeight={"Medium"}>
              Register
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
export default Register;
