import * as React from 'react';
import {Modal, ModalContent, ModalBody, ModalHeader,} from '@nextui-org/react'

interface IDialogWinnerProps {
    openDialog: boolean
    close: () => void
    winner: string
}

const DialogWinner: React.FunctionComponent<IDialogWinnerProps> = ({openDialog, close, winner}) => {

    return (
        <Modal isOpen={openDialog} onClose={close}>
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
                                mendapatkan hadiah
                            </div>
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    );
};

export default DialogWinner;
