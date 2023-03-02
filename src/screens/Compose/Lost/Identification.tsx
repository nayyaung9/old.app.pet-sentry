import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Input from "~/components/Input";
import useLostPet from "~/hooks/useLostPet";
import { BottomSheet } from "react-native-btr";
import collar_colors from "~/utils/constants/collar_colors.json";
import { AntDesign } from "@expo/vector-icons";

import { StyleConstants } from "~/utils/theme/constants";
import ThemeText from "~/components/ThemeText";
import { useTheme } from "~/utils/theme/ThemeManager";

type PetLostIdentificationState = {
  collarColor: string;
  specialTrait: string;
};
type PetLostIdentificationProps = {
  state: PetLostIdentificationState;
  onPetSpecialTraitChange: (value: string) => void;
  onSelectPetCollarColor: (value: string) => void;
};
const PetIdentification = ({
  state,
  onPetSpecialTraitChange,
  onSelectPetCollarColor,
}: PetLostIdentificationProps) => {
  const { colors } = useTheme();
  const { toggleCollarColorModal, collarModal } = useLostPet();
  return (
    <View>
      <ThemeText
        fontStyle="L"
        fontWeight="Medium"
        style={{ marginBottom: StyleConstants.Spacing.M }}
      >
        Identification
      </ThemeText>
      <View style={styles.inputView}>
        <Pressable onPress={toggleCollarColorModal}>
          <View pointerEvents="none">
            <Input label="Collar Color" value={state.collarColor} />
          </View>
        </Pressable>
      </View>

      <View style={styles.inputView}>
        <Input
          label="Special traits"
          as="textarea"
          value={state.specialTrait}
          onChangeText={(value) => onPetSpecialTraitChange(value)}
        />
      </View>

      <BottomSheet
        visible={collarModal}
        onBackButtonPress={toggleCollarColorModal}
        onBackdropPress={toggleCollarColorModal}
      >
        <View style={styles.bottomNavigationView}>
          {collar_colors?.map((collar_color, index) => (
            <Pressable
              key={index}
              style={styles.modalItem}
              onPress={() => {
                toggleCollarColorModal();
                onSelectPetCollarColor(collar_color?.name);
              }}
            >
              <ThemeText fontWeight="Medium">{collar_color?.name}</ThemeText>
              {state?.collarColor == collar_color.name && (
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
export default PetIdentification;
