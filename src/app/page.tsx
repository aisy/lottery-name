"use client";
import { useState } from "react";
import NameList from "@/components/NameList";
import { Button } from '@nextui-org/react'
import TitleLotery from "@/components/TitleLotery";
import useListLotery from "@/stores/storeListLottery";

export default function Home() {

    const { listLottery } = useListLotery()
    const [isShuffling, setIsShuffling] = useState<boolean>(false);

    const onClick = () => {
        setIsShuffling(true);
    }

    const stopShuffle = () => {
        setIsShuffling(false);
    }

    return (
        <div className="flex flex-col justify-center items-center h-fit">
            <TitleLotery
                title={"Event Ulang Tahung Satkomindo 2024"}
            />
            <NameList
                startShuffle={isShuffling}
                stopShuffle={stopShuffle}
            />
            <div className="mt-10">
                <Button
                    isDisabled={listLottery.length === 0}
                    size={"lg"}
                    radius={"full"}
                    onClick={onClick}
                    className="bg-orange-400 px-3 py-2 text-white"
                >
                    Pilih Pemenang
                </Button>
            </div>
        </div>
    );
}
