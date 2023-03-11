import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import ThemeText from "~/components/ThemeText";
import { Ionicons } from "@expo/vector-icons";
import AppBar from "~/components/AppBar";
import ProgressBar from "~/components/ProgressBar";
import { Flow } from "react-native-animated-spinkit";

import PetInformation from "./Lost/Information";
import PetLostRoot from "./Lost/Root";
import PetIdentification from "./Lost/Identification";
import * as ImagePicker from "expo-image-picker";

// Utils & Queries
import { firebase } from "~/libs/firebase";
import useLostPet from "~/hooks/useLostPet";
import { useTheme } from "~/utils/theme/ThemeManager";
import { useNavigation } from "@react-navigation/native";
import { StyleConstants } from "~/utils/theme/constants";
import { useMapAddress } from "~/utils/state/useMapState";
import { useUserCoordinates } from "~/utils/state/useGeoAddress";
import { usePostCreateMutation } from "~/libs/mutation/post";
import { useQueryClient } from "@tanstack/react-query";
import type { BottomTabsScreenProps } from "~/@types/navigators";
import moment from "moment";

const STEP_COUNTS = 3;

const PetLostForm = () => {
  const queryClient = useQueryClient();
  const navigation =
    useNavigation<BottomTabsScreenProps<"Tab-Compose">["navigation"]>();
  const { colors } = useTheme();
  const mapAdress = useMapAddress();
  const userCoordinates = useUserCoordinates();
  const { activeStepNo, onNext, onPrev } = useLostPet();

  // States
  const [imageUploading, setImageUploading] = useState(false);
  const [state, setState] = useState({
    petName: "",
    petType: "",
    gender: "",
    address: "",
    collarColor: "",
    specialTrait: "",
    information: "",
    photos: [],
    lostDate: new Date(),
  });

  useEffect(() => {
    if (mapAdress) {
      setState({ ...state, address: mapAdress });
    }
  }, [mapAdress]);

  const onPetNameChange = (value: string) =>
    setState({ ...state, petName: value });

  const onPetAddressChange = (value: string) =>
    setState({ ...state, address: value });

  const onPetInformationChange = (value: string) =>
    setState({ ...state, information: value });

  const onPetSpecialTraitChange = (value: string) =>
    setState({ ...state, specialTrait: value });

  const onSelectPetType = (type: string) => {
    setState({ ...state, petType: type });
  };

  const onSelectPetGender = (value: string) => {
    setState({ ...state, gender: value });
  };

  const onSelectPetCollarColor = (value: string) => {
    setState({ ...state, collarColor: value });
  };

  const onSelectLostDate = (selectedDate: any) => {
    setState({ ...state, lostDate: selectedDate });
  };

  const onSelectPhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      const fileName = `PetSentryApp-${moment(new Date).format("MMMYYYYDDss")}`;

      await uploadImageToFirebaseStorage(file.uri, fileName)
        .then((res) => console.log("RES", res))
        .catch((err) => console.log("Image Uplladed Error", err));
    }
  };

  const uploadImageToFirebaseStorage = async (
    uri: string,
    fileName: string
  ) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    console.log(fileName);

    const ref = firebase
      .storage()
      .ref()
      .child("pets/" + fileName);
    const snapshot = ref.put(blob);
    return snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setImageUploading(true);
      },
      (error) => {
        setImageUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setImageUploading(false);
          setState({ ...state, photos: [...state.photos, url] });
          blob.close();
          return url;
        });
      }
    );
  };
  /**
   * We'll implement this map feature in coming release version.
   */
  // const onNavigateToMap = () => {
  //   navigation.navigate("Map-Screen", {
  //     isPin: true,
  //     point: {
  //       latitude: userCoordinates?.latitude,
  //       longitude: userCoordinates?.longitude,
  //     },
  //   });
  // };

  const mutation = usePostCreateMutation({
    onSuccess: (res) => {
      if (res?._id) {
        navigation.navigate("Timeline-Detail", { postId: res?._id });
      }
    },
  });

  const onSubmit = () => {
    const {
      petName,
      petType,
      information,
      collarColor,
      specialTrait,
      gender,
      lostDate,
      photos,
    } = state;
    const payload = {
      geolocation: [userCoordinates.longitude, userCoordinates.latitude],
      address: state.address,
      petName,
      petType,
      information,
      collarColor,
      activityType: "Missing",
      specialTraits: specialTrait,
      gender: gender,
      photos,
      activityDate: lostDate,
    };
    mutation.mutate(payload);
  };

  const onPressHandler = async () => {
    if (activeStepNo != STEP_COUNTS) {
      onNext();
    } else {
      onSubmit();
      console.log("Final Submit");
    }
  };

  const onCheckValidation = () => {
    if (activeStepNo == 1) {
      return !state.petName || !state.petType || !state.gender ? true : false;
    }

    if (activeStepNo == 2) {
      return !state.address || !state.information || !state.lostDate
        ? true
        : false;
    }

    if (activeStepNo == 3) {
      return !state.collarColor ? true : false;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title="Lost Pet"
        leftCustomComponent={
          <Pressable
            onPress={() => (activeStepNo != 1 ? onPrev() : navigation.goBack())}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
        }
        rightCustomComponent={
          <Pressable onPress={onPressHandler}>
            {mutation.isLoading ? (
              <Flow color={colors.primary} size={24} />
            ) : (
              <ThemeText color={onCheckValidation() ? "#ddd" : colors.primary}>
                {activeStepNo != STEP_COUNTS ? "Continue" : "Publish"}
              </ThemeText>
            )}
          </Pressable>
        }
      />
      <View
        style={{
          paddingHorizontal: StyleConstants.Spacing.M,
          backgroundColor: "#fff",
        }}
      >
        <ProgressBar activeStep={activeStepNo} stepCounts={STEP_COUNTS} />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          paddingTop: StyleConstants.Spacing.M,
          paddingHorizontal: StyleConstants.Spacing.M,
        }}
      >
        {activeStepNo == 1 && (
          <PetLostRoot
            {...{
              state: {
                petName: state.petName,
                petType: state.petType,
                gender: state.gender,
                photos: state.photos,
              },
              onSelectPhoto,
              onPetNameChange,
              onSelectPetType,
              onSelectPetGender,
            }}
          />
        )}
        {activeStepNo == 2 && (
          <PetInformation
            {...{
              state: {
                address: state.address,
                information: state.information,
                lostDate: state.lostDate,
              },
              onPetAddressChange,
              onPetInformationChange,
              onSelectLostDate,
            }}
          />
        )}
        {activeStepNo == 3 && (
          <PetIdentification
            {...{
              state: {
                collarColor: state.collarColor,
                specialTrait: state.specialTrait,
              },
              onPetSpecialTraitChange,
              onSelectPetCollarColor,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default PetLostForm;
