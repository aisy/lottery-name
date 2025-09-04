import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const convertStringArray = (input: string): string[] => {
  // Hilangkan spasi di awal dan akhir serta hapus baris kosong
  const cleanedInput = input.trim().replace(/,+/g, ",").replace(/,\n/g, ",");
  const nameArray = cleanedInput.split(/,\s*|\n/);

  // Hilangkan elemen kosong jika ada
  return nameArray.filter((name) => name.length > 0);
};
