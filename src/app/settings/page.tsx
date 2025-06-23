'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'
import { useFormik } from 'formik';
import storeListLotery from '@/stores/storeListLottery';
// import storeWinner from '@/stores/storeWinner';
import BreadCrumb from '@/components/Breadcrumb';

interface settingValues {
    nameEvent: string
    list: string
}

const SettingsPage: React.FunctionComponent = () => {

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
        <div className='mt-8 px-5'>
            <BreadCrumb />
            <div>
                <form onSubmit={formik.handleSubmit} className='flex flex-col space-y-5'>
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
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;
