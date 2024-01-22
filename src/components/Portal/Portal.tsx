import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

type IPortal = {
  children: ReactNode;
};

const Portal = ({ children }: IPortal) => {
  const portalRoot = document.getElementById("portal-root")!;
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    portalRoot.appendChild(el.current);

    return () => {
      portalRoot.removeChild(el.current);
    };
  }, [portalRoot]);

  return createPortal(children, el.current);
};

export default Portal;
