import { useReducer } from "react";

const reducer = (value: number) => value + 1;

const useForceUpdate = (): (() => void) => {
  const [, update] = useReducer(reducer, 0);
  return update;
};

export default useForceUpdate;
