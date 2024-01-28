import { useState } from "react";
import { useUser } from "../../context/UserContext";
import useUserData from "../../hooks/useUserData";
import { LoaderOverlay } from "../Loader/Loader";
import Modal from "../Modal/Modal";
import Select from "react-select";
import { apiCreateThread } from "../../lib/api/thread/thread.endpoint";
import { IApiThread } from "../../lib/api/thread/thread.interface";
import {
  apiAddUserThread,
  apiChangeUserById,
} from "../../lib/api/user/user.endpoint";

type IAddNewChat = {
  show: boolean;
  onClose: () => void;
  afterExecute: (
    threads: { [id: number | string]: { value: boolean } }[]
  ) => void;
};

type IOptions = {
  value: string | number;
  label: string;
};

export default function AddNewChat({
  show,
  onClose,
  afterExecute,
}: IAddNewChat) {
  const { status, userList } = useUserData();
  const { user } = useUser();
  const [selectedUsers, setSelectedUsers] = useState<IOptions[]>([]);
  const [chatName, setChatName] = useState("");

  if (!show) return null;

  let options: IOptions[] = [];

  userList.forEach((userOption) => {
    if (user?.id !== userOption.id)
      options.push({
        value: userOption.id,
        label: userOption.name,
      });
  });

  const handleAdd = () => {
    let members: { [id: number | string]: { value: boolean } } = {
      [user?.id ?? -1]: { value: true },
    };

    selectedUsers.forEach((selectedUser) => {
      members[selectedUser.value] = { value: true };
    });

    const arrayMembers = Object.entries(members ?? {}).map(([key, value]) => ({
      [key]: value,
    }));

    let thread: IApiThread = {
      name: chatName,
      members: members,
    };

    apiCreateThread(thread).then((res) => {
      arrayMembers.forEach((member, key) => {
        apiAddUserThread(user?.id ?? 0, { [res.data.name]: { value: true } });
        const threads = user?.threads
          ? [...user?.threads, { [res.data.name]: { value: true } }]
          : [{ [res.data.name]: { value: true } }];
        if (user?.id === Object.keys(member)[0]) afterExecute(threads);

        if (key === arrayMembers.length) {
          handleClose();
        }
      });
    });
  };

  const handleClose = () => {
    setSelectedUsers([]);
    setChatName("");
    onClose();
  };

  return (
    <Modal
      show={show}
      title="Add new chat"
      onClose={handleClose}
      data-testid="add-new-chat-modal"
    >
      <div className="text-black mt-6 flex flex-col gap-4 h-64 justify-between">
        <LoaderOverlay status={status} />
        <div className="flex flex-col gap-4">
          <Select
            options={options}
            isMulti
            closeMenuOnSelect={false}
            value={selectedUsers}
            onChange={(e) => setSelectedUsers([...e])}
          />
          <input
            value={chatName}
            onChange={(e) => {
              setChatName(e.target.value);
            }}
            className="p-4 text-white"
            placeholder="Chat name"
          />
        </div>
        <button className="p-4 bg-blue-500 rounded-md" onClick={handleAdd}>
          Add
        </button>
      </div>
    </Modal>
  );
}
