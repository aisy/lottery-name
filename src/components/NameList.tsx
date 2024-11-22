import { useEffect, useState, FunctionComponent } from 'react';
import useWinnerStore from '@/stores/storeWinner';
import useListLotery from "@/stores/storeListLottery";
import DialogWinner from './DialogWinner';

interface INameListProps {
    startShuffle: boolean
    stopShuffle: () => void
}

const NameList: FunctionComponent<INameListProps> = ({ startShuffle, stopShuffle }) => {

    const shuffleName = (array: string[]) => {
        const randomIndex: number = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    // set list
    const { listLottery } = useListLotery()
    const { winner, setWinner } = useWinnerStore();
    const [isOpen, setIsOpen] = useState(false);

    function close() {
        setIsOpen(false)
    }

    useEffect(() => {
        setWinner(shuffleName(listLottery));
    }, [listLottery, setWinner]);

    useEffect(() => {
        if (startShuffle) {
            const shuffleInterval = setInterval(() => {
                setWinner(shuffleName(listLottery));
            }, 80);

            setTimeout(() => {
                clearInterval(shuffleInterval);

                // set winner
                setWinner(shuffleName(listLottery));
                // open dialog
                setIsOpen(true)

                // stop shuffle
                stopShuffle()
            }, 5000); // set animation 5 detik

            return () => clearInterval(shuffleInterval);
        }
    }, [startShuffle, listLottery, setWinner, stopShuffle]);

    return (
        <div className={'w-full'}>
            <DialogWinner openDialog={isOpen} close={close} winner={winner} />
            <div className={'flex items-center justify-center'}>
                {listLottery.length === 0 ?
                    <div>
                        Mohon isi data list
                    </div>
                    :
                    <div className='flex bg-white w-3/4 px-4 py-2 rounded-full justify-center items-center'>
                        <div className="font-bold text-4xl">
                            {winner}
                        </div>
                    </div>}

            </div>
        </div>
    );
};

export default NameList;
