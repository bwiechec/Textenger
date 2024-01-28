import { useState } from "react";
import Modal from "../Modal/Modal";
import { useThread } from "../../context/ThreadContext";
import { apiChangeThread } from "../../lib/api/thread/thread.endpoint";
import { useUser } from "../../context/UserContext";

type IRenameThread = {
  show: boolean;
  onClose: () => void;
};

export default function RenameThread({ show, onClose }: IRenameThread) {
  const { thread, setThread } = useThread();
  const { user, setUser } = useUser();
  const [newName, setNewName] = useState("");

  const handleClose = () => {
    setNewName("");
    onClose();
  };

  const confirmChange = () => {
    if (newName === "") {
      alert("name is empty");
      return null;
    }

    apiChangeThread({ name: newName }, thread?.id ?? "0").then(() => {
      handleClose();
      setThread({
        name: newName,
        members: thread?.members,
        id: thread?.id ?? "0",
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
      size="md"
    >
      <div className="flex items-center w-full mt-6 gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="p-4 text-white w-60"
          placeholder="Chat name"
        />
        <button className="p-4 bg-blue-500 rounded-md" onClick={confirmChange}>
          Confirm
        </button>
      </div>
    </Modal>
  );
}
