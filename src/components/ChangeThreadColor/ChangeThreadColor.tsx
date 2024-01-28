import { useState } from "react";
import Modal from "../Modal/Modal";
import { useThread } from "../../context/ThreadContext";
import { apiChangeThread } from "../../lib/api/thread/thread.endpoint";
import { useUser } from "../../context/UserContext";
import { availableColorList } from "../../lib/utils/helper";

type IChangeThreadColor = {
  show: boolean;
  onClose: () => void;
};

export default function ChangeThreadColor({
  show,
  onClose,
}: IChangeThreadColor) {
  const { thread, setThread } = useThread();
  const { user, setUser } = useUser();
  const [selectedColor, setSelectedColor] = useState(thread?.colors?.sent);

  const handleClose = () => {
    onClose();
  };

  const confirmChange = () => {
    if (selectedColor === "") {
      alert("name is empty");
      return null;
    }

    apiChangeThread(
      { name: thread?.name ?? "", colors: { sent: selectedColor } },
      thread?.id ?? "0"
    ).then(() => {
      handleClose();
      setThread({
        name: thread?.name ?? "",
        members: thread?.members,
        id: thread?.id ?? "0",
        colors: { sent: selectedColor, received: thread?.colors?.received },
        emoji: thread?.emoji,
      });
      user && setUser({ ...user, lastChangeTimestamp: new Date().getTime() });
    });
  };

  return (
    <Modal
      show={show}
      title="Rename chat"
      onClose={handleClose}
      data-testid="rename-chat-modal"
      size="lg"
    >
      <div className="flex flex-col items-center w-full mt-6 gap-8">
        <div className="flex items-center justify-center w-full mt-6 gap-4">
          {availableColorList &&
            availableColorList.map((color) => {
              return (
                <button
                  key={color}
                  className={`${color} rounded-full h-8 w-8 ${
                    color === selectedColor &&
                    "border-4 border-solid border-white"
                  }`}
                  onClick={() => setSelectedColor(color)}
                ></button>
              );
            })}
        </div>

        <button className="p-4 bg-blue-500 rounded-md" onClick={confirmChange}>
          Confirm
        </button>
      </div>
    </Modal>
  );
}
