import { create } from 'zustand'
import { persist } from 'zustand/middleware';

// state
interface ListLoteryState {
    listLotery: string[]
}

// list actions
interface ListLoteryActions {
    setListLotery: (newList: string[]) => void
}

type ListLoteryStore = ListLoteryState & ListLoteryActions

const useListLotery = create<ListLoteryStore>()(
    persist(
        (set) => ({
            listLotery: [],
            setListLotery: (newList: string[]) => set({ listLotery: [...newList] })
        }),
        {
            // set name key in localstorage
            name: 'listLottery',

            // 
            partialize: (state) => ({
                listLotery: state.listLotery
            })
        },
    )
);

export default useListLotery