"use client";
import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
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

interface settingValues {
  nameEvent: string;
  list: string;
}

const DrawerOption: React.FunctionComponent = () => {
  const { setListLottery, listLottery } = storeListLotery();

  const initialValues: settingValues = {
    nameEvent: "",
    list: listLottery.length > 0 ? listLottery.join(", ") : "",
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
                  <div className="text-xl font-bold">Settings - Data</div>
                </div>
              </DrawerTitle>
              <DrawerClose />
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
                    <FormInput
                      label="List Data yang di Acak"
                      name="list"
                      placeholder="List data yang diacak"
                      as="textarea"
                      rows={6}
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
