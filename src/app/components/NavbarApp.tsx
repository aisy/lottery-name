import * as React from 'react';

interface INavbarAppProps {
}

const NavbarApp: React.FunctionComponent<INavbarAppProps> = (props) => {
   return (
      <div className='bg-white/80 top-0 p-4 rounded-b-2xl w-full'>
         <div className='flex justify-between'>
            <div>Satkomindo</div>
            <div>Settings</div>
         </div>
      </div>
   );
};

export default NavbarApp;
