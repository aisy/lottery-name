import {create} from 'zustand'

// state
interface WinnerState {
    winner: string
}

// action
interface WinnerActions {
    setWinner: (newWinner: string) => void
}

type WinnerStore = WinnerState & WinnerActions

const useWinnerStore = create<WinnerStore>((set) => ({
    winner: "",
    setWinner: (newWinner: string) => set({winner: newWinner})
}));

export default useWinnerStore