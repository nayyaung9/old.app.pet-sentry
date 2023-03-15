import React, { useEffect, useReducer, useState } from "react";
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

import composeReducer from "./utils/reducer";
import { ComposeState } from "./utils/types";
import ComposeContext from "./utils/createContext";

import moment from "moment";
import useLostPet from "~/hooks/useLostPet";
import { useTheme } from "~/utils/theme/ThemeManager";
import { useNavigation } from "@react-navigation/native";
import { StyleConstants } from "~/utils/theme/constants";
import { useMapAddress } from "~/utils/state/useMapState";
import { useGeoAddress, useUserCoordinates } from "~/utils/state/useGeoAddress";
import { usePostCreateMutation } from "~/libs/mutation/post";
import { firebase } from "~/libs/firebase";
import type { BottomTabsScreenProps } from "~/@types/navigators";

const STEP_COUNTS = 3;

const PetLostForm = () => {
  const navigation =
    useNavigation<BottomTabsScreenProps<"Tab-Compose">["navigation"]>();
  const { colors } = useTheme();
  const mapAdress = useMapAddress();
  const geoAddress = useGeoAddress();
  const userCoordinates = useUserCoordinates();
  const { activeStepNo, onNext, onPrev } = useLostPet();

  const initialReducerState: ComposeState = {
    petName: "",
    petType: "",
    gender: "",
    address: "",
    collarColor: "",
    specialTrait: "",
    information: "",
    lostDate: new Date(),
  };

  const [composeState, composeDispatch] = useReducer(
    composeReducer,
    initialReducerState
  );

  useEffect(() => {
    if (mapAdress) {
      composeDispatch({
        type: "onChangeText",
        payload: { key: "address", value: mapAdress },
      });
    }
  }, [mapAdress]);

  const [photos, setPhotos] = useState<string[]>([]);
  const [tempImagePreview, setTempImagePreview] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const onSelectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      const fileName = `PetSentryApp-${moment(new Date()).format(
        "MMMYYYYDDss"
      )}`;

      setTempImagePreview(file.uri);
      await uploadImageToFirebaseStorage(file.uri, fileName);
    }
  };

  const uploadImageToFirebaseStorage = async (
    uri: string,
    fileName: string
  ) => {
    const response = await fetch(uri);
    const blob = (await response.blob()) as any;

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
          setPhotos([...photos, url]);
          blob.close();
          return url;
        });
      }
    );
  };

  const onRemovePhoto = (uri: string) => {
    let selectedPhotos = photos.filter((photo) => photo != uri);

    setPhotos(selectedPhotos);
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
      address,
      information,
      collarColor,
      specialTrait,
      gender,
      lostDate,
    } = composeState;
    const payload = {
      geolocation: [userCoordinates.longitude, userCoordinates.latitude],
      address,
      petName: petName as string,
      petType,
      information,
      collarColor,
      activityType: "Missing",
      specialTraits: specialTrait as string,
      gender,
      photos,
      activityDate: lostDate,
      systemedShortAddress: geoAddress || null,
    };
    mutation.mutate(payload);
  };

  const onPressHandler = () => {
    return activeStepNo != STEP_COUNTS ? onNext() : onSubmit();
  };

  const onCheckValidation = () => {
    if (activeStepNo == 1) {
      return !composeState.petName ||
        !composeState.petType ||
        !composeState.gender ||
        photos.length < 1
        ? true
        : false;
    }
    if (activeStepNo == 2) {
      return !composeState.address ||
        !composeState.information ||
        !composeState.lostDate
        ? true
        : false;
    }
    if (activeStepNo == 3) {
      return !composeState.collarColor ? true : false;
    }
  };

  return (
    <ComposeContext.Provider value={{ composeState, composeDispatch }}>
      <View style={{ flex: 1 }}>
        <AppBar
          title="Lost Pet"
          leftCustomComponent={
            <Pressable
              onPress={() =>
                activeStepNo != 1 ? onPrev() : navigation.goBack()
              }
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          }
          rightCustomComponent={
            <Pressable onPress={onPressHandler} disabled={onCheckValidation()}>
              {mutation.isLoading ? (
                <Flow color={colors.primary} size={24} />
              ) : (
                <ThemeText
                  color={onCheckValidation() ? "#ddd" : colors.primary}
                >
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
                photos,
                onRemovePhoto,
                onSelectPhoto,
                tempImagePreview,
                imageUploading,
              }}
            />
          )}
          {activeStepNo == 2 && <PetInformation />}
          {activeStepNo == 3 && <PetIdentification />}
        </View>
      </View>
    </ComposeContext.Provider>
  );
};

export default PetLostForm;
