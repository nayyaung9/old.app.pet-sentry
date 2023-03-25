import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Input from "~/components/Input";
import ThemeText from "~/components/ThemeText";
import { useMe } from "~/libs/query/user";
import { StyleConstants } from "~/utils/theme/constants";
import { Feather } from "@expo/vector-icons";
import { RootStackScreenProps } from "~/@types/navigators";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "~/utils/theme/ThemeManager";

interface ProfileState {
  _id: string;
  contactNumbers: null | string[];
  email: string;
  name: string;
  profileUrl: string | null;
}
const ProfileSetting: React.FC<RootStackScreenProps<"Profile-Setting">> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  const { data } = useMe();

  const [previewImage, setPreviewImage] = useState("");
  const [state, setState] = useState<ProfileState>({
    _id: "",
    contactNumbers: [],
    email: "",
    name: "",
    profileUrl: null,
  });

  useEffect(() => {
    console.log("Hello")
    navigation.setOptions({
      title: "Edit Your Profile",
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#555" />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={onProfileUpdate}>
          <ThemeText color={colors.primary} fontStyle={"S"}>
            Update
          </ThemeText>
        </Pressable>
      ),
    });
  }, [state]);

  useEffect(() => {
    if (data) {
      setState({
        ...state,
        _id: data?._id,
        contactNumbers: data?.contactNumbers,
        email: data?.email,
        name: data?.name,
        profileUrl: data?.profileUrl,
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

  const onContactNumberChange = (value, index) => {
    const existingNumbers = state.contactNumbers;

    existingNumbers[index] = value;

    setState({ ...state, contactNumbers: existingNumbers });
  };

  const onProfileUpdate = () => {
    console.log({ state });
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
      </View>

      <View style={styles.inputView}>
        <Input
          label="Name"
          value={state.name}
          onChangeText={(value) => onChangeText("name")(value)}
        />
      </View>
      <View style={styles.inputView}>
        <Input
          label="Email"
          editable={false}
          value={state.email}
          onChangeText={(value) => onChangeText("email")(value)}
        />
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
  addNumberButton: {
    backgroundColor: "#f0f2f5",
    borderRadius: 8,
    paddingVertical: StyleConstants.Spacing.S - 2,
    paddingHorizontal: StyleConstants.Spacing.M - 4,
  },
});
export default ProfileSetting;
