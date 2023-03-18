import React, { useContext } from "react";
import { Pressable, StyleSheet, View, Image, ScrollView } from "react-native";
import Input from "~/components/Input";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ThemeModal from "~/components/ThemeModal";

import useLostPet from "~/hooks/useLostPet";
import { StyleConstants } from "~/utils/theme/constants";
import pet_types from "~/utils/constants/pet_types.json";
import genders from "~/utils/constants/genders.json";
import ThemeText from "~/components/ThemeText";
import { useTheme } from "~/utils/theme/ThemeManager";
import { Flow } from "react-native-animated-spinkit";
import ComposeContext from "../utils/createContext";

type PetLostRootProps = {
  photos: string[];
  tempImagePreview: string;
  onRemovePhoto: (value: string) => void;
  onSelectPhoto: () => void;
  imageUploading: boolean;
};
const PetLostRoot = ({
  photos,
  onSelectPhoto,
  onRemovePhoto,
  tempImagePreview,
  imageUploading,
}: PetLostRootProps) => {
  const { colors } = useTheme();
  const { togglePetTypeModal, petTypeModal, toggleGenderModal, genderModal } =
    useLostPet();

  const { composeState, composeDispatch } = useContext(ComposeContext);
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
          value={composeState.petName as string}
          onChangeText={(value) =>
            composeDispatch({
              type: "onChangeText",
              payload: { key: "petName", value },
            })
          }
        />
      </View>

      <View style={styles.inputView}>
        <Pressable onPress={togglePetTypeModal}>
          <View pointerEvents="none">
            <Input label="Select Pet Type" value={composeState.petType} />
          </View>
        </Pressable>
      </View>

      <View style={styles.inputView}>
        <Pressable onPress={toggleGenderModal}>
          <View pointerEvents="none">
            <Input label="Gender" value={composeState.gender} />
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
          {photos.length < 5 && (
            <Pressable onPress={onSelectPhoto} style={styles.imageUploadButton}>
              <Ionicons name="image-outline" size={32} color="#a4a9ac" />
            </Pressable>
          )}

          {tempImagePreview?.length >= 1 && imageUploading && (
            <View style={{ width: 80, height: 80, marginRight: 12 }}>
              <Image
                source={{ uri: tempImagePreview }}
                style={styles.uploadPhotoView}
              />

              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderRadius: 4,
                }}
              />

              <View
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  bottom: "45%",
                }}
              >
                <Flow size={32} color={"#fff"} />
              </View>
            </View>
          )}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.photoViewLayout}
          >
            {Array.isArray(photos) &&
              photos.length >= 1 &&
              photos.map((img, index) => (
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

      <ThemeModal
        openThemeModal={petTypeModal}
        onCloseThemeModal={togglePetTypeModal}
      >
        <View style={styles.bottomNavigationView}>
          {pet_types?.map((petType, index) => (
            <Pressable
              key={index}
              style={styles.modalItem}
              onPress={() => {
                togglePetTypeModal();
                composeDispatch({
                  type: "onChangeText",
                  payload: { key: "petType", value: petType?.label },
                });
              }}
            >
              <ThemeText fontWeight="Medium">{petType?.label}</ThemeText>
              {composeState?.petType == petType.label && (
                <AntDesign name="check" size={20} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </View>
      </ThemeModal>

      <ThemeModal
        openThemeModal={genderModal}
        onCloseThemeModal={toggleGenderModal}
      >
        <View style={styles.bottomNavigationView}>
          {genders?.map((gender, index) => (
            <Pressable
              key={index}
              style={styles.modalItem}
              onPress={() => {
                toggleGenderModal();
                composeDispatch({
                  type: "onChangeText",
                  payload: { key: "gender", value: gender?.value },
                });
              }}
            >
              <ThemeText fontWeight="Medium">{gender?.label}</ThemeText>
              {composeState?.gender == gender.value && (
                <AntDesign name="check" size={20} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </View>
      </ThemeModal>
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
