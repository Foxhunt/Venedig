import { useApp } from "@pixi/react";
import { Container, DisplayObject } from "pixi.js";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
  RefObject,
} from "react";

export const Context = createContext<
  [
    RefObject<Container<DisplayObject>>[],
    Dispatch<SetStateAction<RefObject<Container<DisplayObject>>[]>>
  ]
>([[], () => {}]);

export const useLabelContext = () => {
  return useContext(Context);
};

export default function LabelContext({ children }: PropsWithChildren) {
  const [labels, setLabels] = useState<RefObject<Container<DisplayObject>>[]>(
    []
  );

  return (
    <Context.Provider value={[labels, setLabels]}>{children}</Context.Provider>
  );
}
