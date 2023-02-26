import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { RootStackScreenProps } from "~/@types/navigators";
import mapStyles from "./mapStyles.json";
import MapLabel from "./MapLabel";
import { useMapAddressActions } from "~/utils/state/useMapState";

const initialRegion = {
  latitude: 16.833734,
  longitude: 96.167805,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Map: React.FC<RootStackScreenProps<"Map-Screen">> = ({
  route: {
    params: { isPin = false, point },
  },
}) => {
  const { setMapAddress, setMapCoordinates } = useMapAddressActions();

  const FINAL_LATITUDE =
    point?.latitude == 0
      ? initialRegion?.latitude
      : (point?.latitude as number);

  const FINAL_LONGITUDE =
    point?.longitude == 0
      ? initialRegion?.longitude
      : (point?.longitude as number);

  const [region] = useState({
    latitude: FINAL_LATITUDE,
    longitude: FINAL_LONGITUDE,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [pinPoint, setPinPoint] = useState({
    latitude: FINAL_LATITUDE,
    longitude: FINAL_LONGITUDE,
  });

  const onGetPointOnMap = ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => setPinPoint({ latitude, longitude });

  const onConfirmLocationPoints = (location: string) => {
    // setMapState({
    //   address: location,
    //   coordinates: {
    //     latitude: pinPoint?.latitude!,
    //     longitude: pinPoint?.longitude!,
    //   },
    // });

    setMapAddress(location);
    setMapCoordinates({
      latitude: pinPoint?.latitude,
      longitude: pinPoint?.longitude,
    });
  };

  return (
    <View style={styles.container}>
      {isPin && (
        <MapLabel
          {...{
            pinPoint,
            getMapInfo: (mapAddress: string) =>
              onConfirmLocationPoints(mapAddress),
          }}
        />
      )}
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        region={region}
        customMapStyle={mapStyles}
        onPress={(e) => isPin && onGetPointOnMap(e.nativeEvent.coordinate)}
      >
        {pinPoint && (
          <Marker
            image={require("assets/images/paw-pin.png")}
            coordinate={{
              latitude: pinPoint?.latitude,
              longitude: pinPoint?.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
export default Map;
