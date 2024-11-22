import { create } from 'zustand'
import { persist } from 'zustand/middleware';

// state
interface ListLotteryState {
    listLottery: string[];
    isLoading: boolean;
    // loadListLottery: () => void;
}

// list actions
interface ListLoteryActions {
    setListLottery: (newList: string[]) => void;
}

type ListLoteryStore = ListLotteryState & ListLoteryActions

const useListLotery = create<ListLoteryStore>()(
    persist(
        (set) => ({
            listLottery: [],
            isLoading: true,
            // loadListLottery: () => {
            //     const storedList: string[] = JSON.parse(localStorage.getItem('listLottery') || '[]');
            //     console.log(storedList)
            //     set({
            //         // listLottery: storedList, 
            //         isLoading: false
            //     });
            // },
            setListLottery: (newList: string[]) => {
                set({ listLottery: [...newList] })
            }
        }),
        {
            // set name key in localstorage
            name: 'listLottery',
            partialize: (state) => ({
                listLottery: state.listLottery
            })
        },
    )
);

export default useListLotery