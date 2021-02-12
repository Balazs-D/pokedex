
import { createContext } from "react";
export const Context = createContext<{
  state?: any;
  dispatch?: React.Dispatch<any>;
}>({})
