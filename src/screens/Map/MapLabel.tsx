import React from "react";
import ThemeText from "~/components/ThemeText";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import { useNavigation } from "@react-navigation/native";
import { useGeocodingQuery } from "~/libs/query/geocoding";
import { Ionicons } from "@expo/vector-icons";

const device = Dimensions.get("window");

type MapGenerateLabelProps = {
  pinPoint: {
    latitude: number;
    longitude: number;
  };
  getMapInfo: (mapAddress: string) => void;
};

const MapLabel = ({ pinPoint, getMapInfo }: MapGenerateLabelProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const query = `${pinPoint?.latitude}, ${pinPoint?.longitude}`;

  const { isLoading, data } = useGeocodingQuery({
    coordinates: query,
  });

  const onConfirmMapInfo = () => {
    if (data) {
      getMapInfo(data);
      navigation.goBack();
    }
  };

  console.log("Data", data)

  return (
    <>
      <View style={styles.mapSearchView}>
        <View style={styles.mapSearchHeader}>
          <ThemeText
            style={{ flex: 1, marginRight: 8 }}
            color={isLoading ? colors.textDisable : "#000"}
            numberOfLines={1}
          >
            {data || "Please pin your location on map."}
          </ThemeText>
          <Pressable
            disabled={isLoading || data == ""}
            onPress={onConfirmMapInfo}
            children={() => (
              <>
                {isLoading ? (
                  <ActivityIndicator color={colors.primary} size={"small"} />
                ) : (
                  <Ionicons name="md-checkmark" color="green" size={24} />
                )}
              </>
            )}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mapSearchView: {
    position: "absolute",
    top: 40,
    zIndex: 9,
    width: "100%",
    alignItems: "center",
  },
  mapSearchHeader: {
    width: device?.width - 48,
    paddingVertical: StyleConstants.Spacing.S + 4,
    paddingHorizontal: StyleConstants.Spacing.M,
    backgroundColor: "#fff",
    elevation: 10,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chooseButton: {
    position: "absolute",
    top: 10,
    right: 16,
    zIndex: 9,
  },
});

export default MapLabel;
