'use client';
import * as React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerOverlay, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import storeListLotery from '@/stores/storeListLottery';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

// interface IDrawerOptionProps {
// }

interface settingValues {
  nameEvent: string
  list: string
}

const DrawerOption: React.FunctionComponent = () => {

  const convertStringArray = (input: string): string[] => {
    // Hilangkan spasi di awal dan akhir serta hapus baris kosong
    const cleanedInput = input.trim().replace(/,+/g, ',').replace(/,\n/g, ',');
    const nameArray = cleanedInput.split(/,\s*|\n/);

    // Hilangkan elemen kosong jika ada
    return nameArray.filter(name => name.length > 0);
  };

  const { setListLottery, listLottery } = storeListLotery()

  // set formik form
  const formik = useFormik({
    initialValues: {
      nameEvent: '',
      list: listLottery.length > 0 ? listLottery.join(', ') : ''
    },
    enableReinitialize: true,
    onSubmit: (values: settingValues) => {
      const convertArray = convertStringArray(values.list);
      // const names = convertArray.join(',\n ');
      // console.log(convertArray);
      setListLottery(convertArray)
    }
  })

  return (
    <div>
      <Drawer direction='right'>
        {/* trigger button */}
        <DrawerTrigger>
          <AdjustmentsHorizontalIcon className='size-7 bg-blue-200 p-1 rounded-md hover:bg-orange-300 hover:text-white' />
        </DrawerTrigger>

        {/* overlay */}
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Settings - Data</DrawerTitle>
              <DrawerClose />
            </DrawerHeader>
            <DrawerDescription>
              <form onSubmit={formik.handleSubmit} className='flex flex-col space-y-5'>
                <div className='p-5'>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="nameEvent">Nama Event</Label>
                    <Input
                      id="nameEvent"
                      name="nameEvent"
                      type="text"
                      placeholder='Nama event/acara'
                      onChange={formik.handleChange}
                      value={formik.values.nameEvent}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="list">List Data yang di Acak</Label>
                    <Textarea
                      id={'list'}
                      name={'list'}
                      placeholder='List data yang diacak'
                      onChange={formik.handleChange}
                      value={formik.values.list}
                    />
                  </div>
                  <Button
                    className='w-full rounded-full'
                    type='submit'
                    color='primary'
                  >
                    Simpan Data
                  </Button>
                </div>
              </form>
            </DrawerDescription>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  )
};

export default DrawerOption;
