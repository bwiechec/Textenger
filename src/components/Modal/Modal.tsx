import Portal from "../Portal/Portal";
import { FaX } from "react-icons/fa6";

type IModal = {
  show: boolean;
  children: JSX.Element;
  title: string;
  onClose: () => void;
};

export default function Modal({ show, children, title, onClose }: IModal) {
  return (
    <Portal>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          show ? "block" : "hidden"
        }`}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-50 bg-[#242424] p-6 w-96 h-96 rounded-md">
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
