'use client';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useFormik } from 'formik';
import storeListLotery from '@/stores/storeListLottery';
import storeWinner from '@/stores/storeWinner';

interface settingValues {
   nameEvent: string
   list: string
}

const SettingsPage: React.FunctionComponent = () => {

   const { setListLottery, listLottery } = storeListLotery()
   const { listWinner } = storeWinner()

   const formik = useFormik({
      initialValues: {
         nameEvent: '',
         list: listLottery.length > 0 ? listLottery.join(', ') : ''
      },
      enableReinitialize: true,
      onSubmit: (values: settingValues) => {
         const convertArray = values.list.split(', ')
         // console.log(convertArray);
         setListLottery(convertArray)
      }
   })

   return (
      <div className='mt-16 px-5'>
         <div>
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
         <div>
            {
               listWinner.map((item: string, key: number) => (
                  <div key={key}>{item}</div>
               ))}
         </div>
      </div>
   );
};

export default SettingsPage;
