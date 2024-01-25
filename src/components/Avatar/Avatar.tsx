type IAvatar = {
  alt: string;
  size?: "sm" | "md" | "xl" | "2xl";
};

export default function Avatar({ alt, size }: IAvatar) {
  const bgColor = alt.charAt(0).toUpperCase() as AlphabetLetter;
  return (
    <div
      data-testid="avatar"
      className={`${
        size ? avatarSize[size] : "w-8 h-8"
      } p-2 rounded-full justify-center items-center flex ${
        letterColors[bgColor]
      }`}
    >
      {alt.charAt(0)}
    </div>
  );
}

const avatarSize = {
  sm: "w-4 h-4 text-[8px]",
  md: "w-6 h-6",
  xl: "w-8 h-8",
  "2xl": "w-16 h-16",
};

const letterColors = {
  A: "bg-[#4285F4]", // Google Blue
  B: "bg-[#DB4437]", // Google Red
  C: "bg-[#F4B400]", // Google Yellow
  D: "bg-[#0F9D58]", // Google Green
  E: "bg-[#673AB7]", // Google Purple
  F: "bg-[#FF5722]", // Deep Orange
  G: "bg-[#FFC107]", // Amber
  H: "bg-[#2196F3]", // Blue
  I: "bg-[#4CAF50]", // Green
  J: "bg-[#FF9800]", // Orange
  K: "bg-[#795548]", // Brown
  L: "bg-[#607D8B]", // Blue Grey
  M: "bg-[#E91E63]", // Pink
  N: "bg-[#009688]", // Teal
  O: "bg-[#9C27B0]", // Purple
  P: "bg-[#FFEB3B]", // Yellow
  Q: "bg-[#8BC34A]", // Light Green
  R: "bg-[#3F51B5]", // Indigo
  S: "bg-[#FF4081]", // Pink Accent
  T: "bg-[#00BCD4]", // Cyan
  U: "bg-[#FF5722]", // Deep Orange (again, you can change this)
  V: "bg-[#673AB7]", // Purple (again, you can change this)
  W: "bg-[#4CAF50]", // Green (again, you can change this)
  X: "bg-[#E91E63]", // Pink (again, you can change this)
  Y: "bg-[#FFC107]", // Amber (again, you can change this)
  Z: "bg-[#2196F3]", // Blue (again, you can change this)
};

type AlphabetLetter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";
