import * as React from 'react';
import {Modal, ModalContent, ModalBody, ModalHeader, } from '@nextui-org/react'

interface IDialogWinnerProps {
   openDialog: boolean
   close: () => void
   winner: string
}

const DialogWinner: React.FunctionComponent<IDialogWinnerProps> = ({ openDialog, close, winner }) => {

   return (
       <Modal isOpen={openDialog} onClose={close}>
         <ModalContent>
            <>
               <ModalHeader className="flex flex-col gap-1">Selamat!</ModalHeader>
               <ModalBody>
                  Pemenangnya adalah {winner}
               </ModalBody>
            </>
         </ModalContent>
       </Modal>
   );
};

export default DialogWinner;
