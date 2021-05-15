import { RefObject, useCallback, useState } from "react";

export const useCenteredContainer = (): [
    // RefObject<HTMLDivElement>,
    { x: number; y: number; },
    (node: HTMLDivElement) => void
  ] => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useCallback((containerElem:HTMLDivElement) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);
  return [translate, containerRef];
};