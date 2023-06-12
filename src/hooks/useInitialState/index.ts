import { useGlobalDataStore } from "./globalData";

export default function useInitialState() {
  return useGlobalDataStore();
}
