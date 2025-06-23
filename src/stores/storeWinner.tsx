import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// state
interface WinnerState {
    winner: string | null
}
interface WinnerPersistState {
    listWinner: string[]
}

// action
interface WinnerActions {
    setWinner: (newWinner: string | null) => void
}
interface WinnerPersistAction {
    setListWinner: (newListWinner: string) => void
}


type WinnerStore = WinnerState & WinnerActions
type WinnerPersistStore = WinnerPersistState & WinnerPersistAction

const winnerStore = create<WinnerStore>((set) => (
    {
        winner: null,
        setWinner: (winner) => {
            set({ winner })
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