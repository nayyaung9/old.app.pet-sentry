import { create } from "zustand";

interface MapState {
  mapAddress: string;
  selectedMapCoordinates: PetSentry.CoordinatesProps;
  actions: {
    setMapAddress: (name: string) => void;
    setMapCoordinates: (coordinates: PetSentry.CoordinatesProps) => void;
  };
}

const useMapState = create<MapState>()((set) => ({
  mapAddress: "",
  selectedMapCoordinates: {
    latitude: 0,
    longitude: 0,
  },
  actions: {
    setMapAddress: (name) => set({ mapAddress: name }),
    setMapCoordinates: (coordinates) =>
      set({
        selectedMapCoordinates: {
          latitude: coordinates?.latitude,
          longitude: coordinates?.longitude,
        },
      }),
  },
}));

export const useMapAddress = () => useMapState((state) => state.mapAddress);

export const useMapAddressActions = () => useMapState((state) => state.actions);
