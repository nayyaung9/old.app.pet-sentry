import React from "react";
import { Pressable, StyleSheet, View, Image, ScrollView } from "react-native";
import { BottomSheet } from "react-native-btr";
import Input from "~/components/Input";
import { AntDesign, Ionicons } from "@expo/vector-icons";

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
  photos: string | string[];
};
type PetLostRootProps = {
  state: PetLostRootState;
  onPetNameChange: (value: string) => void;
  onSelectPetType: (value: string) => void;
  onSelectPetGender: (value: string) => void;
  onRemovePhoto: (value: string) => void;
  onSelectPhoto: () => void;
};
const PetLostRoot = ({
  state,
  onPetNameChange,
  onSelectPetType,
  onSelectPetGender,
  onSelectPhoto,
  onRemovePhoto,
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
        <ThemeText fontWeight="Medium">Photos</ThemeText>
        <ThemeText
          fontStyle={"S"}
          color={colors.textSecondary}
          fontWeight="Medium"
        >
          Maxium 5 photos are allowed.
        </ThemeText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: StyleConstants.Spacing.M,
          }}
        >
          {state.photos.length < 5 && (
            <Pressable onPress={onSelectPhoto} style={styles.imageUploadButton}>
              <Ionicons name="image-outline" size={32} color="#a4a9ac" />
            </Pressable>
          )}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.photoViewLayout}
          >
            {Array.isArray(state.photos) &&
              state.photos.length >= 1 &&
              state.photos.map((img, index) => (
                <View key={index} style={styles.uploadPhotoView}>
                  <Image source={{ uri: img }} style={styles.uploadedPhoto} />
                  <Pressable
                    onPress={() => onRemovePhoto(img)}
                    style={{
                      position: "absolute",
                      right: -8,
                      top: -10,
                      backgroundColor: "#fff",
                      borderRadius: 50,
                      zIndex: 9,
                      borderWidth: 1,
                      borderColor: "#f0f2f5",
                    }}
                  >
                    <Ionicons name="remove" size={24} color="black" />
                  </Pressable>
                </View>
              ))}
          </ScrollView>
        </View>
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
  photoViewLayout: {
    paddingVertical: StyleConstants.Spacing.M - 4,
  },
  uploadPhotoView: {
    width: 80,
    height: 80,
    marginRight: StyleConstants.Spacing.M - 4,
  },
  uploadedPhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  imageUploadButton: {
    borderWidth: 1,
    borderColor: "#c4c6c8",
    borderStyle: "dashed",
    borderRadius: 4,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginRight: StyleConstants.Spacing.M - 4,
    marginTop: StyleConstants.Spacing.M - 16,
  },
});
export default PetLostRoot;
