import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// state
interface WinnerState {
    winner: string
}
interface WinnerPersistState {
    listWinner: string[]
}

// action
interface WinnerActions {
    setWinner: (newWinner: string) => void
}
interface WinnerPersistAction {
    setListWinner: (newListWinner: string) => void
}



type WinnerStore = WinnerState & WinnerActions
type WinnerPersistStore = WinnerPersistState & WinnerPersistAction

const winnerStore = create<WinnerStore>((set) => (
    {
        winner: "",
        setWinner: (newWinner: string) => {
            set({ winner: newWinner })
        },
    }
));

const winnnerPersistStore = create<WinnerPersistStore>()(
    persist(
        (set) => ({
            listWinner: [],
            setListWinner: (newListWinner: string) => {
                // console.log(newListWinner);
                set((state) => ({
                    listWinner: [...state.listWinner, newListWinner],
                }))
            }
        }),
        {
            // set name key in localstorage
            name: 'listWinner',
        }
    )
)

const useStoreWinner = () => ({
    ...winnerStore(),
    ...winnnerPersistStore()
})

export default useStoreWinner