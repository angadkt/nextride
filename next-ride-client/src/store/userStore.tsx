import { count, time } from "console";
import { create } from "zustand";

interface storeState {
  isOpen: Boolean;
  handleOpenAndClose: () => void;
  isClose: Boolean;
  handleIsClose: () => void;
  pickupLocation: string;
  pickupDate: string;
  dropoffDate: string;
  pickUpTime: string;
  dropOfTime: string;
  setPickupLocation: (location: string) => void;
  setPickupDate: (date: string) => void;
  setDropoffDate: (date: string) => void;
  setPicktime: (data: string) => void;
  setdropOfTime: (data: string) => void;
  reqCount: number;
  setReqCount: (count: number) => void;
  // selectedReq : any
}

const useStore = create<storeState>((set) => ({
  isOpen: false,
  handleOpenAndClose: () => set((state) => ({ isOpen: !state.isOpen })),
  isClose: true,
  handleIsClose: () => set((state) => ({ isClose: !state.isClose })),
  pickupLocation: "",
  pickupDate: "",
  dropoffDate: "",
  pickUpTime: "",
  dropOfTime: "",
  setPickupLocation: (location) => set({ pickupLocation: location }),
  setPickupDate: (date) => set({ pickupDate: date }),
  setDropoffDate: (date) => set({ dropoffDate: date }),
  setPicktime: (time) => set({ pickUpTime: time }),
  setdropOfTime: (time) => set({ dropOfTime: time }),
  reqCount: 0,
  setReqCount: (count) => set({ reqCount: count }),
  // selectedReq : ""
}));

export default useStore;
