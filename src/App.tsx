import ChatList from "./components/ChatList/ChatList";
import MessageList from "./components/MessageList/MessageList";
import UserSelector from "./components/UserSelector/UserSelector";
import { useUser } from "./context/UserContext";

export default function App() {
  const { user } = useUser();

  if (!user) return <UserSelector />;

  return (
    <div className="w-screen flex">
      <ChatList />
      <MessageList />
    </div>
  );
}
