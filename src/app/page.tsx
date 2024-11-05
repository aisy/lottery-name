"use client";
import { useState } from "react";
import NavbarApp from "./components/NavbarApp";
import NameList from "./components/NameList";
import {Button} from '@nextui-org/react'
import TitleLotery from "@/app/components/TitleLotery";

export default function Home() {

    // const [winner, setWinner] = useState<string>('');
    const [isShuffling, setIsShuffling] = useState<boolean>(false);

    const onClick = () => {
        setIsShuffling(true);
    }

    const stopShuffle = () => {
        setIsShuffling(false);
    }
    return (
        <div className="flex w-full h-screen">
            <div className="flex items-center justify-center h-scree w-1/3">
            </div>
            <div className="flex flex-col h-screen bg-red-200 w-1/3 relative ">
                <NavbarApp />
                <div className="bg-blue-100 flex flex-col justify-center items-center h-full">
                    <TitleLotery
                        title={"Event Ulang Tahung Satkomindo 2024"}
                    />
                    <NameList
                        startShuffle={isShuffling}
                        stopShuffle={stopShuffle}
                    />
                    <div className="mt-10">
                        <Button
                            size={"lg"}
                            radius={"full"}
                            onClick={onClick}
                            className="bg-orange-400 px-3 py-2 text-white"
                        >
                            Pilih Pemenang
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center h-screen w-1/3">
            </div>
        </div>
    );
}
