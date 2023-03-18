import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Input from "~/components/Input";
import ComposeContext from "../utils/createContext";
import ThemeText from "~/components/ThemeText";
import ThemeModal from "~/components/ThemeModal";

import useLostPet from "~/hooks/useLostPet";
import collar_colors from "~/utils/constants/collar_colors.json";
import { AntDesign } from "@expo/vector-icons";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";

const PetIdentification = () => {
  const { colors } = useTheme();
  const { toggleCollarColorModal, collarModal } = useLostPet();
  const { composeState, composeDispatch } = useContext(ComposeContext);

  const onHandleInputChange = (key: string, value: string) =>
    composeDispatch({
      type: "onChangeText",
      payload: { key, value },
    });

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
            <Input label="Collar Color" value={composeState.collarColor} />
          </View>
        </Pressable>
      </View>

      <View style={styles.inputView}>
        <Input
          label="Special traits"
          as="textarea"
          value={composeState.specialTrait as string}
          onChangeText={(value) => onHandleInputChange("specialTrait", value)}
        />
      </View>

      <ThemeModal
        openThemeModal={collarModal}
        onCloseThemeModal={toggleCollarColorModal}
      >
        <View style={styles.bottomNavigationView}>
          {collar_colors?.map((collar_color, index) => (
            <Pressable
              key={index}
              style={styles.modalItem}
              onPress={() => {
                toggleCollarColorModal();
                onHandleInputChange("collarColor", collar_color?.name);
              }}
            >
              <ThemeText fontWeight="Medium">{collar_color?.name}</ThemeText>
              {composeState?.collarColor == collar_color.name && (
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
});
export default PetIdentification;
