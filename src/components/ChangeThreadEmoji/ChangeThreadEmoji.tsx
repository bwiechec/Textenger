import { useState } from "react";
import Modal from "../Modal/Modal";
import { useThread } from "../../context/ThreadContext";
import { apiChangeThread } from "../../lib/api/thread/thread.endpoint";
import { useUser } from "../../context/UserContext";
import { availableEmojiList } from "../../lib/utils/helper";

type IChangeThreadEmoji = {
  show: boolean;
  onClose: () => void;
};

export default function ChangeThreadEmoji({
  show,
  onClose,
}: IChangeThreadEmoji) {
  const { thread, setThread } = useThread();
  const { user, setUser } = useUser();
  const [selectedEmoji, setSelectedEmoji] = useState(thread?.emoji);

  const handleClose = () => {
    onClose();
  };

  const confirmChange = () => {
    if (selectedEmoji === "") {
      alert("name is empty");
      return null;
    }

    apiChangeThread(
      { name: thread?.name ?? "", emoji: selectedEmoji },
      thread?.id ?? "0"
    ).then(() => {
      handleClose();
      setThread({
        name: thread?.name ?? "",
        members: thread?.members,
        id: thread?.id ?? "0",
        emoji: selectedEmoji,
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
          {availableEmojiList &&
            availableEmojiList.map((emoji) => {
              return (
                <button
                  key={emoji}
                  className={`flex items-center justify-center h-12 w-12 text-[2rem] rounded-full ${
                    emoji === selectedEmoji
                      ? "bg-blue-500"
                      : "bg-white bg-opacity-15"
                  }`}
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </button>
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
