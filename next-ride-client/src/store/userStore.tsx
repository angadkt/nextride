import { create } from "zustand";

interface storeState{
    isOpen : Boolean,
    handleOpenAndClose : () => void
}

const useStore = create <storeState>((set) =>({
    isOpen : false,
    handleOpenAndClose: () => set((state) => ({isOpen : !state.isOpen}))
}))

export default useStore