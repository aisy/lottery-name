"use client";
import { useEffect, useState } from "react";
import NavbarApp from "./components/NavbarApp";

export default function Home() {

    const shuffleName = (array: string[]) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    const listName = ["Dio", "Jojo", "Joseph", "Donald", "Jodio"];
    const [winner, setWinner] = useState<string>(shuffleName(listName));
    const [isShuffling, setIsShuffling] = useState<boolean>(false);

    useEffect(() => {
        if (isShuffling) {
            const shuffleInterval = setInterval(() => {
                setWinner(shuffleName(listName));
            }, 80);

            setTimeout(() => {
                clearInterval(shuffleInterval);
                setWinner(shuffleName(listName));
                setIsShuffling(false);
            }, 5000); // Animasi berlangsung selama 5 detik

            return () => clearInterval(shuffleInterval);
        }
    }, [isShuffling]);

    const onClick = () => {
        setIsShuffling(true);
    }

    return (
        <div className="flex w-full h-screen">
            <div className="flex items-center justify-center h-scree w-1/3">
            </div>
            <div className="flex flex-col h-screen bg-red-200 w-1/3 relative">
                <NavbarApp />
                <div className="bg-blue-100 flex flex-col justify-center items-center h-full">
                    <div className="font-bold text-4xl">
                        {winner}
                    </div>
                    <div className="mt-10">
                        <button onClick={onClick} className="bg-orange-400 px-3 py-2 rounded-full text-white">
                            Pilih Pemenang
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center h-screen w-1/3">
            </div>
        </div>
    );
}
