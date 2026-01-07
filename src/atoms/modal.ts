import { atom } from "recoil";

export const isEmailModalOpenState = atom<boolean>({
  key: 'isEmailModalOpenState',
  default: false,
});
