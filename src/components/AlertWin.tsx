import * as React from 'react';
import useWinnerStore from '@/stores/storeWinner'
// import useListLotery from '@/stores/storeListLottery';
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface IDialogWinnerProps {
    openDialog: boolean;
    onOpenChange: (open: boolean) => void;
    // close: () => void;
}

const AlertWin: React.FunctionComponent<IDialogWinnerProps> = ({ openDialog, onOpenChange }) => {

    const { winner } = useWinnerStore();
    // const { removeListLottery } = useListLotery();

    // const handleOpenChange = () => {
    //     // removeListLottery(winner)
    //     close()
    // }

    return (
        <Dialog open={openDialog} onOpenChange={onOpenChange}>
            {/* <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{winner}</DialogTitle>
                    <DialogContent>
                        <div className='flex items-center justify-center h-auto my-5'>
                            <Image
                                alt='coin'
                                width={200}
                                height={200}
                                src={'/win.svg'}
                            />
                        </div>
                        <div className={"text-4xl font-bold text-black p-2 rounded-full"}>
                            Selamat {winner} anda menang
                        </div>
                        <div className={"font-bold"}>
                            mendapatkan hadiah ????
                        </div>
                    </DialogContent>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AlertWin;
