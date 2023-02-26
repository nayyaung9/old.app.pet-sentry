import { create } from "zustand";

interface GeoStateAddress {
  geoAddress: string;
  userCoordinates: PetSentry.CoordinatesProps;
  actions: {
    setGeoAddress: (name: string) => void;
    setUserCoordinates: (coordinates: PetSentry.CoordinatesProps) => void;
  };
}

const useGeoAddressState = create<GeoStateAddress>()((set) => ({
  geoAddress: "",
  userCoordinates: {
    latitude: 0,
    longitude: 0,
  },
  actions: {
    setGeoAddress: (name) => set({ geoAddress: name }),
    setUserCoordinates: (coordinates: PetSentry.CoordinatesProps) =>
      set({
        userCoordinates: {
          latitude: coordinates?.latitude,
          longitude: coordinates?.longitude,
        },
      }),
  },
}));

export const useGeoAddress = () =>
  useGeoAddressState((state) => state.geoAddress);
export const useUserCoordinates = () =>
  useGeoAddressState((state) => state.userCoordinates);

export const useGeoAddressAction = () =>
  useGeoAddressState((state) => state.actions);
