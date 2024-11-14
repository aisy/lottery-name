import { Input, Textarea } from '@nextui-org/react';
import * as React from 'react';

interface ISettingsPageProps {
   title?: string,
   listData?: string[]
}

const SettingsPage: React.FunctionComponent<ISettingsPageProps> = (props) => {
   return (
      <div className='mt-16 px-5'>
         <div>
            <Input type='text' label="Nama Event Acara" labelPlacement='outside' />
            <Textarea
               label={"list data"}
               labelPlacement="outside"
               placeholder='list data'
            />
         </div>
      </div>
   );
};

export default SettingsPage;
