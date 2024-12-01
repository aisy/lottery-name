import * as React from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader, Button, } from '@nextui-org/react'
import useWinnerStore from '@/stores/storeWinner'
import useListLotery from '@/stores/storeListLottery';

interface IDialogWinnerProps {
    openDialog: boolean
    close: () => void
}

const DialogWinner: React.FunctionComponent<IDialogWinnerProps> = ({ openDialog, close }) => {

    const { winner } = useWinnerStore();
    const { removeListLottery } = useListLotery();

    const buttonClick = () => {
        removeListLottery(winner)
        close()
    }

    return (
        <Modal isOpen={openDialog} onClose={close} backdrop={"opaque"}
            classNames={{ base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]", }}>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                    <ModalBody>
                        <div className={"text-center mb-10"}>
                            <div className={"font-bold text-xl text-blue-600 uppercase"}>Selamat</div>
                            <div className={"text-2xl"}>
                                {winner}
                            </div>
                            <div className={"font-bold"}>
                                mendapatkan hadiah ????
                            </div>
                            <div>
                                <Button onClick={buttonClick}>
                                    Ok
                                </Button>
                            </div>
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    );
};

export default DialogWinner;
