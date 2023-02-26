import * as Location from "expo-location";
import { useEffect, useState } from "react";

type CoordinatesProps = {
  latitude: number;
  longitude: number;
};
const useLocation = () => {
  const [location, setLocation] = useState<CoordinatesProps>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      if (location) {
        const latitude = location?.coords?.latitude;
        const longitude = location?.coords?.longitude;
        setLocation({ latitude, longitude });
      }
    })();
  }, []);

  return { location };
};

export default useLocation;
