'use client';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useFormik } from 'formik';
import listLotery from '@/stores/storeListLotery'
import * as React from 'react';

interface ISettingsPageProps {
   title?: string,
   listData?: string[]
}

const SettingsPage: React.FunctionComponent<ISettingsPageProps> = (props) => {

   const { setListLotery } = listLotery()

   const formik = useFormik({
      initialValues: { nameEvent: '', list: '' },
      onSubmit: (values: any) => {
         // console.log(values)

         const convertArray = values.list.split(', ')
         setListLotery(convertArray)
      }
   })

   return (
      <div className='mt-16 px-5'>
         <div >
            <form onSubmit={formik.handleSubmit} className='flex flex-col space-y-5'>
               <Input
                  id='nameEvent'
                  name='nameEvent'
                  type='text'
                  label="Nama event/acara"
                  labelPlacement="outside"
                  placeholder='Nama event/acara'
                  onChange={formik.handleChange}
                  value={formik.values.nameEvent}
               />
               <Textarea
                  id={'list'}
                  name={'list'}
                  label={"List data"}
                  labelPlacement="outside"
                  placeholder='List data yang diacak'
                  onChange={formik.handleChange}
                  value={formik.values.list}
               />
               <Button
                  radius='full'
                  className='w-full'
                  type='submit'
                  color='primary'
               >
                  Simpan Data
               </Button>
            </form>
         </div>
      </div>
   );
};

export default SettingsPage;
