import { create } from "zustand";
import { persist } from "zustand/middleware";

// state
interface ListLotteryState {
  listLottery: string[];
  shuffleDuration: number;
}

// list actions
interface ListLoteryActions {
  setListLottery: (newList: string[]) => void;
  removeListLottery: (listRemove: string) => void;
  setShuffleDuration: (duration: number) => void;
}

type ListLoteryStore = ListLotteryState & ListLoteryActions;

const useListLotery = create<ListLoteryStore>()(
  persist(
    (set) => ({
      listLottery: [],
      shuffleDuration: 5,
      setListLottery: (newList: string[]) => {
        set({ listLottery: [...newList] });
      },
      removeListLottery: (listRemove: string) => {
        set((state) => {
          console.log("Removing:", listRemove);
          console.log("Before:", state.listLottery);

          const newList = state.listLottery.filter(
            (value) => value !== listRemove,
          );

          console.log("After", newList);

          return {
            listLottery: newList,
          };
        });
      },
      setShuffleDuration: (duration: number) => {
        set({ shuffleDuration: duration });
      },
    }),
    {
      name: "listLottery",
      partialize: (state) => ({
        listLottery: state.listLottery,
        shuffleDuration: state.shuffleDuration,
      }),
    },
  ),
);

export default useListLotery;
