import Portal from "../Portal/Portal";
import { FaX } from "react-icons/fa6";

type IModal = {
  show: boolean;
  children: JSX.Element;
  title: string;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
};

export default function Modal({
  show,
  children,
  title,
  onClose,
  size,
}: IModal) {
  return (
    <Portal>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          show ? "block" : "hidden"
        }`}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className={`z-50 bg-[#242424] p-6 rounded-md ${
            size ? modalSize[size] : modalSize["2xl"]
          }`}
        >
          <div className=" items-center w-full flex relative">
            <h3 className="w-full text-xl text-center block">{title}</h3>
            <FaX
              onClick={onClose}
              className="absolute right-0 cursor-pointer"
            />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
}

const modalSize = {
  sm: "w-96 h-32",
  md: "w-96 h-48",
  lg: "w-96 h-64",
  xl: "w-96 h-80",
  "2xl": "w-96 h-96",
};
