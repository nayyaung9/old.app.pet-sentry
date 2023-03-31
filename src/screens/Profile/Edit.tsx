import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Input from "~/components/Input";
import ThemeText from "~/components/ThemeText";
import { ProfileQueryKey, useMe } from "~/libs/query/user";
import { StyleConstants } from "~/utils/theme/constants";
import { Feather } from "@expo/vector-icons";
import { RootStackScreenProps } from "~/@types/navigators";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "~/utils/theme/ThemeManager";
import { useUpdateProfileInfoMutation } from "~/libs/mutation/auth";
import { Flow } from "react-native-animated-spinkit";
import { showMessage } from "react-native-flash-message";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileState {
  _id: string;
  contactNumbers: null | string[];
  email: string;
  profileUrl: string | null;
}
const ProfileSetting: React.FC<RootStackScreenProps<"Profile-Setting">> = ({
  navigation,
}) => {
  const queryClient = useQueryClient();
  const { colors } = useTheme();
  const { data } = useMe();

  const profileQueryKey: ProfileQueryKey = ["Profile-Me"];

  const mutation = useUpdateProfileInfoMutation({
    onSuccess: () => {
      showMessage({
        message: "Your profile is updated.",
        type: "success",
      });
      queryClient.invalidateQueries(profileQueryKey);
      navigation.goBack();
    },
    onError: (error) => console.log(error),
  });

  const [previewImage, setPreviewImage] = useState("");
  const [state, setState] = useState<ProfileState>({
    _id: "",
    contactNumbers: [],
    email: "",
    profileUrl: null,
  });

  useEffect(() => {
    console.log("Hello");
    navigation.setOptions({
      title: "Edit Profile",
      headerTitleAlign: "center",
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#555" />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={onProfileUpdate} disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <Flow size={20} color={colors.primary} />
          ) : (
            <ThemeText color={colors.primary} fontStyle={"S"}>
              Update
            </ThemeText>
          )}
        </Pressable>
      ),
    });
  }, [state, mutation]);

  useEffect(() => {
    if (data) {
      setState({
        ...state,
        _id: data?.user?._id,
        contactNumbers: data?.user?.contactNumbers,
        name: data?.user?.name,
        profileUrl: data?.user?.profileUrl,
      });
    }
  }, [data]);

  const onSelectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];

      setPreviewImage(file.uri);
    }
  };

  const onChangeText = (key: string) => (value: string) => {
    setState({ ...state, [key]: value });
  };

  const onAddNewContactNumber = () =>
    setState({ ...state, contactNumbers: [...state.contactNumbers, ""] });

  const onContactNumberChange = (value: string, index: number) => {
    const existingNumbers = state.contactNumbers;

    existingNumbers[index] = value;

    setState({ ...state, contactNumbers: existingNumbers });
  };

  const onProfileUpdate = () => {
    const { contactNumbers, ...rest } = state;
    const payload = {
      ...rest,
      contactNumbers: contactNumbers?.filter((item) => item != ""),
    };

    mutation.mutate(payload);
  };

  return (
    <View style={styles.root}>
      <View style={styles.inputView}>
        <View style={styles.photoUploadContainer}>
          {previewImage ? (
            <Image source={{ uri: previewImage }} style={styles.profileImage} />
          ) : state?.profileUrl ? (
            <Image
              source={{ uri: state?.profileUrl }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require("assets/images/default_avatar.png")}
              style={styles.profileImage}
            />
          )}

          <Pressable
            onPress={onSelectPhoto}
            style={styles.photoUploadButton}
            children={
              <View>
                <Feather name="camera" size={20} color="#555" />
              </View>
            }
          />
        </View>

        <View style={styles.profileCredentialContainer}>
          <ThemeText fontWeight="Medium" fontStyle={"L"}>
            {data?.user?.name}
          </ThemeText>
          <ThemeText color={colors.textSecondary} fontStyle={"S"}>
            {data?.user?.email}
          </ThemeText>
        </View>
      </View>

      <View style={styles.inputView}>
        <ThemeText>Contact Numbers</ThemeText>

        {state?.contactNumbers &&
          state?.contactNumbers?.map((contactNumber, index) => (
            <View
              style={{ marginBottom: StyleConstants.Spacing.S }}
              key={index}
            >
              <Input
                label=""
                value={state.contactNumbers[index]}
                onChangeText={(value) => onContactNumberChange(value, index)}
              />
            </View>
          ))}
      </View>
      <View style={{ alignItems: "flex-start" }}>
        <Pressable
          style={styles.addNumberButton}
          onPress={onAddNewContactNumber}
        >
          <ThemeText>Add New Number</ThemeText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    padding: StyleConstants.Spacing.M,
  },
  inputView: {
    marginBottom: StyleConstants.Spacing.M,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  photoUploadContainer: {
    alignSelf: "center",
    borderRadius: 100,
  },
  photoUploadButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#ddd",
    padding: StyleConstants.Spacing.S - 4,
  },
  profileCredentialContainer: {
    alignItems: "center",
    paddingTop: StyleConstants.Spacing.S,
  },
  addNumberButton: {
    backgroundColor: "#f0f2f5",
    borderRadius: 8,
    paddingVertical: StyleConstants.Spacing.S - 2,
    paddingHorizontal: StyleConstants.Spacing.M - 4,
  },
});
export default ProfileSetting;
