import { create } from 'zustand'
import { persist } from 'zustand/middleware';

// state
interface ListLotteryState {
    listLottery: string[];
}

// list actions
interface ListLoteryActions {
    setListLottery: (newList: string[]) => void;
    removeListLottery: (listRemove: string) => void;
}

type ListLoteryStore = ListLotteryState & ListLoteryActions

const useListLotery = create<ListLoteryStore>()(
    persist(
        (set) => ({
            listLottery: [],
            // listLottery: ["Mars", "Mercury", "Jupiter", "Saturn"],
            setListLottery: (newList: string[]) => {
                set({ listLottery: [...newList] })
            },
            removeListLottery: (listRemove: string) => {
                set((state) => {
                    console.log('Removing:', listRemove);
                    console.log('Before:', state.listLottery);

                    const newList = state.listLottery.filter(
                        (value) => value !== listRemove
                    )

                    console.log('After', newList);

                    return {
                        listLottery: newList
                    }
                })
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