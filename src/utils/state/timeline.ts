import { create } from "zustand";

interface ModalActionState {
  ownerId: string | null;
  postId: string | null;
}
interface TimelineState {
  statusMenu: boolean;
  selectedInfo: ModalActionState;
  filteringModal: boolean;
  onToggleStatusMenu: () => void;
  setPostInfoForModal: ({
    postId,
    ownerId,
  }: {
    postId: string;
    ownerId: string;
  }) => void;
  onToggleFilteringModal: () => void;
}

export const useTimelineStore = create<TimelineState>()((set) => ({
  statusMenu: false,
  selectedInfo: {
    ownerId: null,
    postId: null,
  },
  filteringModal: false,
  onToggleStatusMenu: () => {
    set((state) => ({
      statusMenu: !state.statusMenu,
    }));
  },
  setPostInfoForModal: ({ postId, ownerId }) => {
    set((state) => ({
      ...state,
      selectedInfo: {
        ...state.selectedInfo,
        ownerId,
        postId,
      },
    }));
  },
  onToggleFilteringModal: () =>
    set((state) => ({ ...state, filteringModal: !state.filteringModal })),
}));

export const useTimelineState = () =>
  useTimelineStore((state) => ({
    statusMenu: state.statusMenu,
    selectedInfo: state.selectedInfo,
    filteringModal: state.filteringModal
  }));
