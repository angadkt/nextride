import { create } from "zustand";

interface storeState {
  isOpen: Boolean;
  handleOpenAndClose: () => void;
  isClose: Boolean;
  handleIsClose: () => void;
  pickupLocation: string;
  pickupDate: string;
  dropoffDate: string;
  setPickupLocation: (location: string) => void;
  setPickupDate: (date: string) => void;
  setDropoffDate: (date: string) => void;
  
}

const useStore = create<storeState>((set) => ({
  isOpen: false,
  handleOpenAndClose: () => set((state) => ({ isOpen: !state.isOpen })),
  isClose: true,
  handleIsClose: () => set((state) => ({ isClose: !state.isClose })),
  pickupLocation: "",
  pickupDate: "",
  dropoffDate: "",
  setPickupLocation: (location) => set({ pickupLocation: location }),
  setPickupDate: (date) => set({ pickupDate: date }),
  setDropoffDate: (date) => set({ dropoffDate: date }),
}));

export default useStore;
