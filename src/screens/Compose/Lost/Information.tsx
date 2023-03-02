import moment from "moment";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Input from "~/components/Input";
import { StyleConstants } from "~/utils/theme/constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import useLostPet from "~/hooks/useLostPet";
import ThemeText from "~/components/ThemeText";

type PetLostInformationState = {
  address: string;
  information: string;
  lostDate: Date;
};
type PetLostInformationProps = {
  state: PetLostInformationState;
  onPetAddressChange: (value: string) => void;
  onPetInformationChange: (value: string) => void;
  onSelectLostDate: any;
};
const PetInformation = ({
  state,
  onPetAddressChange,
  onPetInformationChange,
  onSelectLostDate,
}: PetLostInformationProps) => {
  const { lostDateModal, toggleLostDateModal } = useLostPet();
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
          value={state.address}
          onChangeText={(value) => onPetAddressChange(value)}
        />
      </View>

      <View style={styles.inputView}>
        <Input
          label="Information"
          placeholder="Write down your information how you lose"
          as="textarea"
          value={state.information}
          onChangeText={(value) => onPetInformationChange(value)}
        />
      </View>

      <View style={styles.inputView}>
        <Pressable onPress={toggleLostDateModal}>
          <View pointerEvents="none">
            <Input
              editable={false}
              label="Lost Date"
              value={moment(state.lostDate).format("MMM DD YYYY")}
            />
          </View>
        </Pressable>
      </View>

      {lostDateModal && (
        <DateTimePicker
          value={state.lostDate}
          mode={"date"}
          display={"spinner"}
          is24Hour={true}
          onChange={(event, date) => {
            toggleLostDateModal();
            onSelectLostDate(date);
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
export default PetInformation;
