import React, { useEffect, useState } from "react";
import ThemeText from "~/components/ThemeText";
import { Pressable, StyleSheet, View } from "react-native";
import Input from "~/components/Input";
import { StyleConstants } from "~/utils/theme/constants";
import { useMapAddress } from "~/utils/state/useMapState";
import { useNavigation } from "@react-navigation/native";
import { BottomTabsScreenProps } from "~/@types/navigators";
import { useUserCoordinates } from "~/utils/state/useGeoAddress";

const PetLostForm = () => {
  const navigation =
    useNavigation<BottomTabsScreenProps<"Tab-Compose">["navigation"]>();
  const mapAddress = useMapAddress();
  const userCoordinates = useUserCoordinates();

  console.log("userCoordinates", userCoordinates);

  const [state, setState] = useState({
    petName: "",
    address: "",
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
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
        <Input label="Pet Name" />
      </View>

      <View style={styles.inputView}>
        <Pressable onPress={onNavigateToMap}>
          <View pointerEvents="none">
            <Input
              editable={false}
              label="Missing Pet Here"
              value={state.address}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    marginBottom: StyleConstants.Spacing.M,
  },
});
export default PetLostForm;
