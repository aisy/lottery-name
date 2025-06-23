import * as React from 'react';
import Link from 'next/link'
// import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import DrawerOption from './DrawerOption';

// interface INavbarAppProps {
// }

const NavbarApp: React.FunctionComponent = () => {
   return (
      <div className='bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 top-0 sticky p-4 border-b border-gray-200 rounded-b-2xl h-auto'>
         <div className='flex justify-between'>
            <div>
               <Link href={'/'} className='font-bold text-xl'>Loteri</Link>
            </div>
            <div>
               <DrawerOption />
            </div>
         </div>
      </div>
   );
};

export default NavbarApp;
