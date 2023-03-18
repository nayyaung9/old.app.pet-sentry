import { create } from "zustand";

interface TimelineState {
  statusMenu: boolean;
  onToggleStatusMenu: () => void;
}

export const useTimelineStore = create<TimelineState>()((set) => ({
  statusMenu: false,
  onToggleStatusMenu: () => {
    set((state) => ({ statusMenu: !state.statusMenu }));
  },
}));

export const useTimelineState = () =>
  useTimelineStore((state) => ({
    statusMenu: state.statusMenu,
  }));
