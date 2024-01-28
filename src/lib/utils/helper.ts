export const formatTime = (date: Date) => {
  return (
    ("0" + date.getMonth() + 1).slice(-2) +
    "/" +
    ("0" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2)
  );
};

export const boxRadius = {
  firstCurrent: "rounded-sm rounded-t-2xl rounded-bl-2xl",
  middleCurrent: "rounded-sm rounded-s-2xl",
  lastCurrent: "rounded-sm rounded-b-2xl rounded-tl-2xl",

  firstOther: "rounded-sm rounded-t-2xl  rounded-br-2xl",
  middleOther: "rounded-sm rounded-e-2xl",
  lastOther: "rounded-sm rounded-b-2xl rounded-tr-2xl",
  single: "rounded-2xl",
};

export const getBoxRadius = (
  isFirstMessageOfUser: boolean,
  isLastMessageOfUser: boolean,
  currentUsserMsg: boolean
) => {
  if (currentUsserMsg) {
    if (isFirstMessageOfUser && !isLastMessageOfUser)
      return boxRadius.firstCurrent;
    if (isLastMessageOfUser && !isFirstMessageOfUser)
      return boxRadius.lastCurrent;
    if (isLastMessageOfUser && isFirstMessageOfUser) return boxRadius.single;

    return boxRadius.middleCurrent;
  }
  if (isFirstMessageOfUser && !isLastMessageOfUser) return boxRadius.firstOther;
  if (isLastMessageOfUser && !isFirstMessageOfUser) return boxRadius.lastOther;
  if (isLastMessageOfUser && isFirstMessageOfUser) return boxRadius.single;

  return boxRadius.middleOther;
};

export const availableEmojiList = ["👍", "❤️", "😎", "🙂"];

export const availableColorList = [
  "bg-blue-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-teal-500",
];
