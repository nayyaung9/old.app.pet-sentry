import "react-native-gesture-handler";
import React from "react";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeManager from "~/utils/theme/ThemeManager";

import Navigation from "./src/navigation";
import FlashMessage from "react-native-flash-message";

// Loaders & Utils
import axios from "axios";
import useLocation from "~/hooks/useLocation";
import useCachedResources from "~/hooks/useCachedResources";
import { useGeoAddressAction } from "~/utils/state/useGeoAddress";
import { useMapAddressActions } from "~/utils/state/useMapState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "~/utils/state/useAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

export default function App() {
  const { location } = useLocation();
  const isLoadingComplete = useCachedResources();
  const { setGeoAddress, setUserCoordinates } = useGeoAddressAction();
  const { setMapAddress } = useMapAddressActions();

  const { getCredential } = useAuthStore();

  useEffect(() => {
    getCredential();
    const loadedUserGeoAddress = async () => {
      const { latitude, longitude } = location;

      if (latitude != 0 && longitude != 0) {
        const coordinateQuery = `${latitude}, ${longitude}`;

        const { data: response } = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${coordinateQuery}&key=a6a796cee189462397bba6adc2f87dac&language=en&pretty=1`
        );

        if (response) {
          const { results } = response;
          const { suburb, state } = results[0] && results[0]?.components;
          const isTownshipAvailable = suburb || "";
          const geoCodedLocation = `${isTownshipAvailable}${
            isTownshipAvailable && ","
          }${state || ""}`;
          // This definies user short address for Timeline
          setGeoAddress(geoCodedLocation);
          if (suburb != "" && suburb != undefined && results[0]?.formatted) {
            setMapAddress(`${suburb}, ${results[0]?.formatted}`);
          } else {
            setMapAddress(results[0]?.formatted);
          }

          setUserCoordinates({
            latitude,
            longitude,
          });
        }
      }
    };

    loadedUserGeoAddress();
  }, [location?.latitude, location?.longitude]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeManager>
            <StatusBar />
            <Navigation />
            <FlashMessage />
          </ThemeManager>
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }
}
