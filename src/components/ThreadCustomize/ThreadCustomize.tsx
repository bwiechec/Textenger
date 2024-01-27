import { useState } from "react";
// import { useThread } from "../../context/ThreadContext";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaPalette } from "react-icons/fa6";
import { availableEmojiList } from "../../lib/utils/helper";

export default function ThreadCustomize() {
  //   const { thread } = useThread();
  const [customizeIsOpen, setCustomizeIsOpen] = useState(false);

  return (
    <div className="flex flex-col justify-start w-full">
      <button
        onClick={() => setCustomizeIsOpen((prev) => !prev)}
        className="flex items-center justify-between hover:bg-white hover:bg-opacity-10 rounded-xl p-2"
      >
        Customize [IN TODO] {customizeIsOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {customizeIsOpen && (
        <>
          <div className="flex items-center gap-2">
            <button className="flex gap-2 hover:bg-white hover:bg-opacity-10 p-2 rounded-xl items-center w-full">
              <span className="bg-white bg-opacity-15 p-2 rounded-full">
                <FaRegPenToSquare />
              </span>
              Rename thread
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex gap-2 hover:bg-white hover:bg-opacity-10 p-2 rounded-xl items-center w-full">
              <span className="bg-white bg-opacity-15 p-2 rounded-full">
                <FaPalette className="text-blue-500" />
              </span>
              Change colors
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex gap-2 hover:bg-white hover:bg-opacity-10 p-2 rounded-xl items-center w-full">
              <span className="bg-white bg-opacity-15 p-1 rounded-full text-[1rem] h-8 w-8">
                {availableEmojiList[0]}
              </span>
              Change chat emoji
            </button>
          </div>
        </>
      )}
    </div>
  );
}
