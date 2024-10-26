import { useEffect, useState, FunctionComponent } from 'react';
import useWinnerStore from '../stores/storeWinner';
import DialogWinner from './DialogWinner';

interface INameListProps {
   startShuffle: boolean
   stopShuffle: () => void
}

const NameList: FunctionComponent<INameListProps> = ({ startShuffle, stopShuffle }) => {

   const shuffleName = (array: string[]) => {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
   }

   const listName = ["Dio", "Jojo", "Joseph", "Donald", "Jodio"];
   const { winner, setWinner } = useWinnerStore();
   const [isOpen, setIsOpen] = useState(false);

   // function open() {
   //    setIsOpen(true)
   // }

   function close() {
      setIsOpen(false)
   }

   useEffect(() => {
      // Inisialisasi winner di sisi klien setelah komponen dirender
      // const shuffleTime = 
      setWinner(shuffleName(listName));
   }, []);

   useEffect(() => {
      if (startShuffle) {
         const shuffleInterval = setInterval(() => {
            setWinner(shuffleName(listName));
         }, 80);

         setTimeout(() => {
            clearInterval(shuffleInterval);
            setWinner(shuffleName(listName));
            setIsOpen(true)
            stopShuffle()
         }, 5000); // Animasi berlangsung selama 5 detik

         return () => clearInterval(shuffleInterval);
      }
   }, [startShuffle]);

   return (
      <div>
         <DialogWinner openDialog={isOpen} close={close} winner={winner} />
         <div className='flex bg-white w-3/4 px-4 py-2 rounded-full justify-center items-center'>
            <div className="font-bold text-4xl">
               {winner}
            </div>
         </div>
      </div>
   );
};

export default NameList;
