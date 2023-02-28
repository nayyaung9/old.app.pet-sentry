import React, { useEffect, useState } from "react";
import ThemeText from "~/components/ThemeText";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Input from "~/components/Input";
import { StyleConstants } from "~/utils/theme/constants";
import { useMapAddress } from "~/utils/state/useMapState";
import { useNavigation } from "@react-navigation/native";
import { BottomTabsScreenProps } from "~/@types/navigators";
import { useUserCoordinates } from "~/utils/state/useGeoAddress";
import { BottomSheet } from "react-native-btr";
import pet_types from "~/utils/constants/pet_types.json";
import genders from "~/utils/constants/genders.json";
import collar_colors from "~/utils/constants/collar_colors.json";

import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "~/utils/theme/ThemeManager";

const PetLostForm = () => {
  const navigation =
    useNavigation<BottomTabsScreenProps<"Tab-Compose">["navigation"]>();
  const { colors } = useTheme();
  const mapAddress = useMapAddress();
  const userCoordinates = useUserCoordinates();

  const [petTypeModal, setPetTypeModal] = useState(false);
  const [genderModal, setGenderModal] = useState(false);
  const [collarModal, setCollarModal] = useState(false);

  const togglePetTypeModal = () => setPetTypeModal(!petTypeModal);
  const toggleGenderModal = () => setGenderModal(!genderModal);
  const toggleCollarColorModal = () => setCollarModal(!collarModal);

  const [state, setState] = useState({
    petName: "",
    petType: "",
    gender: "",
    address: "",
    collarColor: "",
    specialTrait: "",
    information: "",
  });

  useEffect(() => {
    if (mapAddress) {
      setState({ ...state, address: mapAddress });
    }
  }, [mapAddress]);

  const onNavigateToMap = () => {
    navigation.navigate("Map-Screen", {
      isPin: true,
      point: {
        latitude: userCoordinates?.latitude,
        longitude: userCoordinates?.longitude,
      },
    });
  };

  const onSelectPetType = (type: string) => {
    setState({ ...state, petType: type });
    togglePetTypeModal();
  };

  const onSelectPetGender = (value: string) => {
    setState({ ...state, gender: value });
    toggleGenderModal();
  };

  const onSelectPetCollarColor = (value: string) => {
    setState({ ...state, collarColor: value });
    toggleCollarColorModal();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: StyleConstants.Spacing.M,
        paddingHorizontal: StyleConstants.Spacing.M,
      }}
    >
      <View style={styles.inputView}>
        <Input
          label="Pet Name"
          value={state.petName}
          onChangeText={(value) => setState({ ...state, petName: value })}
        />
      </View>

      <View style={styles.inputView}>
        <Pressable onPress={togglePetTypeModal}>
          <View pointerEvents="none">
            <Input
              editable={false}
              label="Select Pet Type"
              value={state.petType}
            />
          </View>
        </Pressable>
      </View>

      <View style={styles.inputView}>
        <Pressable onPress={onNavigateToMap}>
          <View pointerEvents="none">
            <Input
              as="textarea"
              editable={false}
              label="Missing Pet Here"
              value={state.address}
            />
          </View>
        </Pressable>
      </View>

      <View style={styles.inputView}>
        <Input
          label="Information"
          multiline
          value={state.information}
          onChangeText={(value) => setState({ ...state, information: value })}
        />
      </View>

      <View style={styles.inputView}>
        <Pressable onPress={toggleGenderModal}>
          <View pointerEvents="none">
            <Input
              numberOfLines={2}
              editable={false}
              label="Gender"
              value={state.gender}
            />
          </View>
        </Pressable>
      </View>

      <View style={styles.inputView}>
        <Pressable onPress={toggleCollarColorModal}>
          <View pointerEvents="none">
            <Input
              editable={false}
              label="Collar Color"
              value={state.collarColor}
            />
          </View>
        </Pressable>
      </View>

      <View style={styles.inputView}>
        <Input
          label="Special traits"
          as="textarea"
          numberOfLines={3}
          value={state.specialTrait}
          onChangeText={(value) => setState({ ...state, specialTrait: value })}
        />
      </View>

      <View style={styles.inputView}>
        <Pressable onPress={togglePetTypeModal}>
          <View pointerEvents="none">
            <Input editable={false} label="Lost Date" value={state.petType} />
          </View>
        </Pressable>
      </View>

      <BottomSheet
        visible={petTypeModal}
        onBackButtonPress={togglePetTypeModal}
        onBackdropPress={togglePetTypeModal}
      >
        <View style={styles.bottomNavigationView}>
          {pet_types?.map((petType, index) => (
            <Pressable
              key={index}
              style={styles.petTypeItem}
              onPress={() => onSelectPetType(petType?.label)}
            >
              <ThemeText fontWeight="Medium">{petType?.label}</ThemeText>
              {state?.petType == petType.label && (
                <AntDesign name="check" size={20} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </View>
      </BottomSheet>

      <BottomSheet
        visible={genderModal}
        onBackButtonPress={toggleGenderModal}
        onBackdropPress={toggleGenderModal}
      >
        <View style={styles.bottomNavigationView}>
          {genders?.map((gender, index) => (
            <Pressable
              key={index}
              style={styles.petTypeItem}
              onPress={() => onSelectPetGender(gender?.value)}
            >
              <ThemeText fontWeight="Medium">{gender?.label}</ThemeText>
              {state?.gender == gender.value && (
                <AntDesign name="check" size={20} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </View>
      </BottomSheet>

      <BottomSheet
        visible={collarModal}
        onBackButtonPress={toggleCollarColorModal}
        onBackdropPress={toggleCollarColorModal}
      >
        <View style={styles.bottomNavigationView}>
          <ScrollView>
            {collar_colors?.map((collar_color, index) => (
              <Pressable
                key={index}
                style={styles.petTypeItem}
                onPress={() => onSelectPetCollarColor(collar_color?.name)}
              >
                <ThemeText fontWeight="Medium">{collar_color?.name}</ThemeText>
                {state?.collarColor == collar_color.name && (
                  <AntDesign name="check" size={20} color={colors.primary} />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    marginBottom: StyleConstants.Spacing.M,
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: StyleConstants.Spacing.M,
  },
  petTypeItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: StyleConstants.Spacing.M,
  },
});
export default PetLostForm;
