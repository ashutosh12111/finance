import { create } from "zustand"


type OpenAccount = {
    isOpen: boolean,
    onOpen: (id: string) => void
    onClose: () => void,
    id?: string
}

export const useOpenAccount = create<OpenAccount>((set) => ({
    isOpen: false,
    onOpen: (id) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false }),
    id: undefined
}))
