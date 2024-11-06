import {useEffect, useState, FunctionComponent} from 'react';
import useWinnerStore from '../stores/storeWinner';
import useListLotery from "@/app/stores/storeListLotery";
import DialogWinner from './DialogWinner';

interface INameListProps {
    startShuffle: boolean
    stopShuffle: () => void
}

const NameList: FunctionComponent<INameListProps> = ({startShuffle, stopShuffle}) => {

    const shuffleName = (array: string[]) => {
        const randomIndex: number = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    // set list
    const {listLotery, setListLotery} = useListLotery()
    const {winner, setWinner} = useWinnerStore();
    const [isOpen, setIsOpen] = useState(false);

    function close() {
        setIsOpen(false)
    }

    // set
    useEffect(() => {
        setListLotery(["Dio", "Jojo", "Joseph", "Donald", "Jodio"]);
    }, [setListLotery]);

    useEffect(() => {
        setWinner(shuffleName(listLotery));
    }, [listLotery, setWinner]);

    useEffect(() => {
        if (startShuffle) {
            const shuffleInterval = setInterval(() => {
                setWinner(shuffleName(listLotery));
            }, 80);

            setTimeout(() => {
                clearInterval(shuffleInterval);

                // set winner
                setWinner(shuffleName(listLotery));
                // open dialog
                setIsOpen(true)

                // stop shuffle
                stopShuffle()
            }, 5000); // set animation 5 detik

            return () => clearInterval(shuffleInterval);
        }
    }, [startShuffle, listLotery, setWinner, stopShuffle]);

    return (
        <div className={'w-full'}>
            <DialogWinner openDialog={isOpen} close={close} winner={winner}/>
            <div className={'flex items-center justify-center'}>
                <div className='flex bg-white w-3/4 px-4 py-2 rounded-full justify-center items-center'>
                    <div className="font-bold text-4xl">
                        {winner}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NameList;
