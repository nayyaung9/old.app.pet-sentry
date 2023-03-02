import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { BottomSheet } from "react-native-btr";
import Input from "~/components/Input";
import { AntDesign } from "@expo/vector-icons";

import useLostPet from "~/hooks/useLostPet";
import { StyleConstants } from "~/utils/theme/constants";
import pet_types from "~/utils/constants/pet_types.json";
import genders from "~/utils/constants/genders.json";
import ThemeText from "~/components/ThemeText";
import { useTheme } from "~/utils/theme/ThemeManager";

type PetLostRootState = {
  petName: string;
  petType: string;
  gender: string;
};
type PetLostRootProps = {
  state: PetLostRootState;
  onPetNameChange: (value: string) => void;
  onSelectPetType: (value: string) => void;
  onSelectPetGender: (value: string) => void;
};
const PetLostRoot = ({
  state,
  onPetNameChange,
  onSelectPetType,
  onSelectPetGender,
}: PetLostRootProps) => {
  const { colors } = useTheme();
  const { togglePetTypeModal, petTypeModal, toggleGenderModal, genderModal } =
    useLostPet();
  return (
    <View>
      <ThemeText
        fontStyle="L"
        fontWeight="Medium"
        style={{ marginBottom: StyleConstants.Spacing.M }}
      >
        Basic Information
      </ThemeText>
      <View style={styles.inputView}>
        <Input
          label="Pet Name"
          value={state.petName}
          onChangeText={(value) => onPetNameChange(value)}
        />
      </View>

      <View style={styles.inputView}>
        <Pressable onPress={togglePetTypeModal}>
          <View pointerEvents="none">
            <Input label="Select Pet Type" value={state.petType} />
          </View>
        </Pressable>
      </View>

      <View style={styles.inputView}>
        <Pressable onPress={toggleGenderModal}>
          <View pointerEvents="none">
            <Input label="Gender" value={state.gender} />
          </View>
        </Pressable>
      </View>

      <View style={styles.inputView}>
        <ThemeText>Photos</ThemeText>
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
              style={styles.modalItem}
              onPress={() => {
                togglePetTypeModal();
                onSelectPetType(petType?.label);
              }}
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
              style={styles.modalItem}
              onPress={() => {
                toggleGenderModal();
                onSelectPetGender(gender?.value);
              }}
            >
              <ThemeText fontWeight="Medium">{gender?.label}</ThemeText>
              {state?.gender == gender.value && (
                <AntDesign name="check" size={20} color={colors.primary} />
              )}
            </Pressable>
          ))}
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
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: StyleConstants.Spacing.M,
  },
});
export default PetLostRoot;
