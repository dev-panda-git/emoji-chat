import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { EmojiMessage } from "./components/EmojiMessage";
import { EmojiForm } from "./components/EmojiForm";

function App() {
  const user: User = {
    id: "04",
    displayName: "🎲",
  };

  interface Message {
    id: string; // Unique identifier for the message
    content: string; // The actual message content (text)
    createdAt: number; // The timestamp of when the message was created
    authorId: string; // The ID of the user who sent the message (optional)
    authorName?: string; // The name of the user who sent the message (optional)
    profilePic?: string; // URL to the sender's profile picture (optional)
  }

  interface User {
    id: string; // Unique identifier for the user
    displayName: string; // User's display name
    email?: string; // User's email address (optional)
    phoneNumber?: string; // User's phone number (optional)
    profilePic?: string; // URL to the user's profile picture (optional)
    status?: string; // User's online status (optional)
    lastActive?: Date; // Timestamp of user's last activity (optional)
  }

  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMsgs = async () => {
    await getDocs(collection(db, "messages")).then((querySnapshot) => {
      const fetchedMsgs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMsgs as Message[]);
    });
  };

  useEffect(() => {
    fetchMsgs();
  }, []);

  console.log(messages.length);

  return (
    <div className="bg-black  relative h-screen w-screen flex items-center justify-center">
      {/* <div className="bg-white/40 backdrop-blur-md rounded-3xl m-auto max-w-xl h-[50vh] w-[98%] overflow-y-scroll absolute z-10">
        <p className="p-3 text-4xl ">pick a usermoji</p>
        <div className="flex text-5 xl items-center justify-center p-2 gap-5 flex-wrap">
          <div className="p-5 rounded-3xl bg-green-200">🐼</div>
          <div className="p-5 rounded-3xl bg-green-200">🥶</div>
          <div className="p-5 rounded-3xl bg-green-200">🥶</div>
          <div className="p-5 rounded-3xl bg-green-200">🐼</div>
          <div className="p-5 rounded-3xl bg-green-200">🐼</div>
          <div className="p-5 rounded-3xl bg-green-200">🥶</div>
          <div className="p-5 rounded-3xl bg-green-200">🥶</div>
        </div>
      </div> */}
      <div className="w-full h-screen overflow-y-scroll max-w-2xl mx-auto relative">
        <div className="p-2 py-5 bg-black/30 backdrop-blur-md sticky top-0 z-10">
          <h1 className="font-bold text-4xl text-center">💬</h1>
        </div>
        <div className="relative w-full p-3 md:px-10">
          {messages.length &&
            messages
              .sort((messageA, messageB) => {
                return messageA.createdAt - messageB.createdAt;
              })
              .map((msg) => (
                <EmojiMessage
                  key={msg.id}
                  emoji={msg.content}
                  author={msg.authorName}
                  time={msg.createdAt}
                  user={user}
                />
              ))}
        </div>
        <EmojiForm fetchMsgs={fetchMsgs} />
      </div>
    </div>
  );
}

export default App;
