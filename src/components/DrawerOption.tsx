"use client";
import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { FormikHelpers } from "formik";
import storeListLotery from "@/stores/storeListLottery";
import { convertStringArray } from "@/lib/utils";
import FormInput from "./form/FormInput";
import FormWrapper from "./form/FormWrapper";
import SubmitForm from "./form/SubmitForm";
import { Settings2Icon } from "lucide-react";
import FormSlider from "./form/FormSlider";

interface settingValues {
  nameEvent: string;
  list: string;
  durationShuffle: number[];
}

const DrawerOption: React.FunctionComponent = () => {
  const { setListLottery, listLottery, shuffleDuration, setShuffleDuration } =
    storeListLotery();

  const initialValues: settingValues = {
    nameEvent: "",
    list: listLottery.length > 0 ? listLottery.join(", ") : "",
    durationShuffle: [shuffleDuration],
  };

  const handleSubmit = async (
    values: settingValues,
    { setSubmitting }: FormikHelpers<settingValues>,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const convertArray = convertStringArray(values.list);
    setListLottery(convertArray);
    setSubmitting(false);
  };

  return (
    <div>
      <Drawer direction="right">
        {/* trigger button */}
        <DrawerTrigger>
          <AdjustmentsHorizontalIcon className="size-7 bg-blue-200 p-1 rounded-md hover:bg-orange-300 hover:text-white" />
        </DrawerTrigger>

        {/* overlay */}
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                <div className="flex items-center gap-2">
                  <Settings2Icon className="size-4" />
                  <div className="text-xl font-bold">Pengaturan</div>
                </div>
              </DrawerTitle>
              <DrawerDescription>
                Manage your notification preferences
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-3">
              <FormWrapper
                initialValues={initialValues}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {(formikProps) => (
                  <>
                    <FormInput
                      label="Nama Event"
                      name="nameEvent"
                      placeholder="Nama event/acara"
                      type="text"
                      as="input"
                    />
                    <FormSlider
                      label="Durasi pengacakan"
                      name="durationShuffle"
                      min={1}
                      max={15}
                      step={1}
                      onChange={(value) => setShuffleDuration(value[0])}
                    />
                    <FormInput
                      label="List Data yang di Acak"
                      name="list"
                      placeholder="List data yang diacak"
                      as="textarea"
                    />
                    <SubmitForm
                      className="w-full bg-blue-500 p-2 text-white rounded-full"
                      isSubmitting={formikProps.isSubmitting}
                    >
                      Simpan Data
                    </SubmitForm>
                  </>
                )}
              </FormWrapper>
            </div>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default DrawerOption;
