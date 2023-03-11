import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Flow } from "react-native-animated-spinkit";
import Button from "~/components/Button";
import Input from "~/components/Input";
import ThemeText from "~/components/ThemeText";
import { useLoginMutation } from "~/libs/mutation/auth";
import { StyleConstants } from "~/utils/theme/constants";
import { RootStackScreenProps } from "~/@types/navigators";
import { useAuthStore } from "~/utils/state/useAuth";
import { showMessage } from "react-native-flash-message";

const Login: React.FC<RootStackScreenProps<"Login-Screen">> = ({
  navigation,
}) => {
  const authenticate = useAuthStore((state) => state.authenticate);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const onHandleInputChange = (name: string) => (value: string) => {
    setState({ ...state, [name]: value });
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

  const onLogin = () => {
    mutation.mutate(state);
  };

  return (
    <SafeAreaView
      style={[
        styles.root,
        {
          paddingBottom: 70,
        },
      ]}
    >
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
        <Input
          label="Email"
          value={state.email}
          onChangeText={(value) => onHandleInputChange("email")(value)}
        />
      </View>
      <View style={styles.inputView}>
        <Input
          label="Password"
          secureTextEntry
          value={state.password}
          onChangeText={(value) => onHandleInputChange("password")(value)}
        />
      </View>
      <Button borderRadius={8} onPress={onLogin}>
        {mutation.isLoading ? (
          <Flow color={"#fff"} size={38} />
        ) : (
          <ThemeText color={"#fff"} fontWeight={"Medium"}>
            Login
          </ThemeText>
        )}
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: StyleConstants.Spacing.L,
  },
  inputView: {
    marginBottom: StyleConstants.Spacing.M,
  },
});
export default Login;
