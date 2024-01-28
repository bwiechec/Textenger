import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaRegPenToSquare } from "react-icons/fa6";
import RenameThread from "../RenameThread/RenameThread";
import { useThread } from "../../context/ThreadContext";
import ChangeThreadColor from "../ChangeThreadColor/ChangeThreadColor";
import ChangeThreadEmoji from "../ChangeThreadEmoji/ChangeThreadEmoji";

export default function ThreadCustomize() {
  const [customizeIsOpen, setCustomizeIsOpen] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showEmojiModal, setShowEmojiModal] = useState(false);
  const { thread } = useThread();

  const closeRenameModal = () => {
    setShowRenameModal(false);
  };

  const closeColorModal = () => {
    setShowColorModal(false);
  };

  const closeEmojiModal = () => {
    setShowEmojiModal(false);
  };

  return (
    <div className="flex flex-col justify-start w-full">
      <button
        onClick={() => setCustomizeIsOpen((prev) => !prev)}
        className="flex items-center justify-between hover:bg-white hover:bg-opacity-10 rounded-xl p-2"
      >
        Customize {customizeIsOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {customizeIsOpen && (
        <>
          <div className="flex items-center gap-2">
            <button
              className="flex gap-2 hover:bg-white hover:bg-opacity-10 p-2 rounded-xl items-center w-full"
              onClick={() => setShowRenameModal(true)}
            >
              <span className="bg-white bg-opacity-15 p-2 rounded-full">
                <FaRegPenToSquare />
              </span>
              Rename thread
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex gap-2 hover:bg-white hover:bg-opacity-10 p-2 rounded-xl items-center w-full"
              onClick={() => setShowColorModal(true)}
            >
              <span
                className={`${thread?.colors?.sent} w-8 h-8 rounded-full`}
              ></span>
              Change colors
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex gap-2 hover:bg-white hover:bg-opacity-10 p-2 rounded-xl items-center w-full"
              onClick={() => setShowEmojiModal(true)}
            >
              <span className="bg-white bg-opacity-15 p-1 rounded-full text-[1rem] h-8 w-8">
                {thread?.emoji}
              </span>
              Change chat emoji
            </button>
          </div>
        </>
      )}

      <RenameThread show={showRenameModal} onClose={closeRenameModal} />
      <ChangeThreadColor show={showColorModal} onClose={closeColorModal} />
      <ChangeThreadEmoji show={showEmojiModal} onClose={closeEmojiModal} />
    </div>
  );
}
