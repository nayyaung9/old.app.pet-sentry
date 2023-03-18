import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Input from "~/components/Input";
import ThemeText from "~/components/ThemeText";
import DateTimePicker from "@react-native-community/datetimepicker";

import moment from "moment";
import useLostPet from "~/hooks/useLostPet";
import ComposeContext from "../utils/createContext";
import { StyleConstants } from "~/utils/theme/constants";

const PetInformation = () => {
  const { lostDateModal, toggleLostDateModal } = useLostPet();

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
        Lost Information
      </ThemeText>
      <View style={styles.inputView}>
        <Input
          label="Address"
          as="textarea"
          value={composeState.address}
          onChangeText={(value) => onHandleInputChange("address", value)}
        />
      </View>

      <View style={styles.inputView}>
        <Input
          label="Information"
          placeholder="Write down your information how you lose"
          as="textarea"
          value={composeState.information}
          onChangeText={(value) => onHandleInputChange("information", value)}
        />
      </View>

      <View style={styles.inputView}>
        <Pressable onPress={toggleLostDateModal}>
          <View pointerEvents="none">
            <Input
              label="Lost Date"
              value={moment(composeState.lostDate).format("MMM DD YYYY")}
            />
          </View>
        </Pressable>
      </View>

      {lostDateModal && (
        <DateTimePicker
          value={composeState.lostDate}
          mode={"date"}
          display={"spinner"}
          is24Hour={true}
          onChange={(event, date) => {
            toggleLostDateModal();
            composeDispatch({
              type: "onSetActivityDate",
              payload: date as Date,
            });
          }}
          locale="en-US"
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    marginBottom: StyleConstants.Spacing.M,
  },
});
export default PetInformation;
