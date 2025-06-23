import { useEffect, useState, useRef, useCallback, FunctionComponent } from 'react';
import useWinnerStore from '@/stores/storeWinner';
import useListLotery from "@/stores/storeListLottery";
import AlertWin from "@/components/AlertWin";

interface INameListProps {
    startShuffle: boolean
    stopShuffle: () => void
}

const NameList: FunctionComponent<INameListProps> = ({ startShuffle, stopShuffle }) => {

    const { listLottery, removeListLottery } = useListLotery()
    const { winner, setWinner, setListWinner } = useWinnerStore();
    const [isOpen, setIsOpen] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    const listLotteryRef = useRef(listLottery);
    const animationRef = useRef<number>(0);
    const frameCountRef = useRef(0);

    // Function to shuffle names from the listLottery
    // and return a random name from the array
    const shuffleName = useCallback((array: string[]) => {
        if (array.length === 0) return '';
        return array[Math.floor(Math.random() * array.length)];
    }, []);

    // set initial display name
    useEffect(() => {
        listLotteryRef.current = listLottery;
    }, [listLottery]);

    // Shuffle name every 3 frames
    const animate = useCallback(() => {
        if (frameCountRef.current % 3 === 0) {
            setDisplayName(shuffleName(listLotteryRef.current));
        }
        frameCountRef.current++;
        animationRef.current = requestAnimationFrame(animate);
    }, [shuffleName]);

    // Start animation when startShuffle is true
    // and stop after 5 seconds or when stopShuffle is called
    // and set the winner
    // and remove the winner from the listLottery
    useEffect(() => {
        if (!startShuffle || listLotteryRef.current.length === 0) {
            setIsAnimating(false);
            return;
        }

        setIsAnimating(true);
        setIsOpen(false);
        frameCountRef.current = 0;
        animationRef.current = requestAnimationFrame(animate);

        const timeoutId = setTimeout(() => {

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            const winnerName = shuffleName(listLotteryRef.current);
            if (winnerName) {
                setWinner(winnerName);
                removeListLottery(winnerName);
                setListWinner(winnerName);
                setIsOpen(true);
            }

            setIsAnimating(false);
            stopShuffle();
        }, 5000);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            clearTimeout(timeoutId);
            setIsAnimating(false);
        };

    }, [listLottery, startShuffle, stopShuffle, setWinner, setListWinner, removeListLottery, animate, shuffleName]);

    // Cleanup on unmount
    // Reset winner and close dialog
    // to avoid memory leaks and reset state
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            setWinner(null); // Reset state saat komponen unmount
            setIsOpen(false);
        };
    }, [setWinner]);

    return (
        <div className={'w-full'}>
            <AlertWin openDialog={isOpen} onOpenChange={setIsOpen} />
            <div className={'flex items-center justify-center'}>
                {listLottery.length <= 1 ?
                    <div className='flex bg-white w-3/4 px-4 py-2 rounded-full justify-center items-center text-center '>
                        <div className='text-red-500 font-bold'>
                            Mohon isi data list lebih dari 1 untuk melakukan pengacakan
                        </div>
                    </div>
                    :
                    <div className='flex bg-white w-3/4 px-4 py-2 rounded-full justify-center items-center'>
                        <div className="font-bold text-4xl">
                            {isAnimating ? displayName : (winner || 'Klik Mulai')}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default NameList;
