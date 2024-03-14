import { StoreApi, UseBoundStore, create } from "zustand";

type typeIsActive = {
  isActive: boolean;
  setIsActive: (s: boolean) => any;
};

const useAlert: UseBoundStore<StoreApi<typeIsActive>> = create((set) => ({
  isActive: false,
  setIsActive: (s: boolean) =>
    set((state: { isActive: boolean }) => ({ isActive: s })),
}));

export default useAlert;
