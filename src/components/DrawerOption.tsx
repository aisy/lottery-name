'use client';
import * as React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerOverlay, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { FormikHelpers } from 'formik';
import storeListLotery from '@/stores/storeListLottery';
import { convertStringArray } from '@/lib/utils';
import FormInput from './form/FormInput';
import FormWrapper from './form/FormWrapper';
import SubmitForm from './form/SubmitForm';

// interface IDrawerOptionProps {
// }

interface settingValues {
  nameEvent: string
  list: string
}

const DrawerOption: React.FunctionComponent = () => {

  const { setListLottery, listLottery } = storeListLotery()

  const initialValues: settingValues = {
    nameEvent: '',
    list: listLottery.length > 0 ? listLottery.join(', ') : ''
  }

  // // set formik form
  // const formik = useFormik({
  //   initialValues: {
  //     nameEvent: '',
  //     list: listLottery.length > 0 ? listLottery.join(', ') : ''
  //   },
  //   enableReinitialize: true,
  //   onSubmit: (values: settingValues) => {
  //     const convertArray = convertStringArray(values.list);
  //     // const names = convertArray.join(',\n ');
  //     // console.log(convertArray);
  //     setListLottery(convertArray)
  //   }
  // })



  const handleSubmit = async (values: settingValues, { setSubmitting }: FormikHelpers<settingValues>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const convertArray = convertStringArray(values.list);
    // const names = convertArray.join(',\n ');
    // console.log(convertArray);
    setListLottery(convertArray)
    setSubmitting(false);
    // formik.resetForm();
  }

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
            {/* <form onSubmit={formik.handleSubmit} className='flex flex-col space-y-5'>
              <div className='p-5 flex flex-col space-y-5'>
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
            </form> */}
            <FormWrapper
              initialValues={initialValues}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {(formikProps) => (
                <>
                  <FormInput
                    label='Nama Event'
                    name='nameEvent'
                    placeholder='Nama event/acara'
                    type='text'
                    as='input'
                  />
                  <FormInput
                    label='List Data yang di Acak'
                    name='list'
                    placeholder='List data yang diacak'
                    as='textarea'
                    rows={6}
                  />
                  <SubmitForm
                    className='w-full rounded-full'
                    isSubmitting={formikProps.isSubmitting}
                  >
                    Simpan Data
                  </SubmitForm>
                </>
              )}

            </FormWrapper>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  )
};

export default DrawerOption;
