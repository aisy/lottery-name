import {create} from 'zustand'

// state
interface ListLoteryState {
    listLotery: string[]
}

// list actions
interface ListLoteryActions {
    setListLotery: (newList: string[]) => void
}

type ListLoteryStore = ListLoteryState & ListLoteryActions

const useListLotery = create<ListLoteryStore>((set) => ({
    listLotery: [],
    setListLotery: (newList: string[]) => set({listLotery: [...newList]})
}));

export default useListLotery