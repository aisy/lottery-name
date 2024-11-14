import * as React from 'react';
import Link from 'next/link'

interface INavbarAppProps {
}

const NavbarApp: React.FunctionComponent<INavbarAppProps> = (props) => {
   return (
      <div className='bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 top-0 sticky p-4 border-b border-gray-200 rounded-b-2xl min-w-full'>
         <div className='flex justify-between'>
            <div>
               <Link href={'/'} className='font-bold text-xl'>Lottery</Link>
            </div>
            <div>
               <Link href={'/settings'}>Settings</Link>
            </div>
         </div>
      </div>
   );
};

export default NavbarApp;
