import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { EmojiMessage } from "./components/EmojiMessage";
import { EmojiForm } from "./components/EmojiForm";

function App() {
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
    displayEmoji: string; // User's display name
    email?: string; // User's email address (optional)
    phoneNumber?: string; // User's phone number (optional)
    profilePic?: string; // URL to the user's profile picture (optional)
    status?: string; // User's online status (optional)
    lastActive?: Date; // Timestamp of user's last activity (optional)
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [user, setUser] = useState<User>();

  const fetchMsgs = async () => {
    await getDocs(collection(db, "messages")).then((querySnapshot) => {
      const fetchedMsgs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMsgs as Message[]);
    });
  };

  const fetchUsers = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers as User[]);
    });
  };

  useEffect(() => {
    fetchMsgs();
  }, []);

  console.log(messages, users);

  const userDataString = localStorage.getItem("user");

  useEffect(() => {
    if (userDataString) {
      // User data exists in local storage
      console.log("User data found!");

      // Parse the JSON string to access the data (optional)
      const userData = JSON.parse(userDataString);
      setUser(userData); // Access user data properties
    } else {
      // User data does not exist in local storage
      fetchUsers();
      console.log("No user data found.");
      // setUser();
      // localStorage.setItem("user", JSON.stringify(userData));
    }
  }, []);

  const SelectUser = async (user: User) => {
    try {
      const userRef = await updateDoc(doc(collection(db, "users"), user.id), {
        claimed: true,
      }); // Add emoji to Firestore
      setUser(user);

      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Error adding emoji:", error);
    }
  };
  return (
    <div className="bg-black  relative h-screen w-screen flex items-center justify-center">
      {!user && (
        <div className="bg-white/20 backdrop-blur-md rounded-[2.5rem] m-auto max-w-xl h-[50vh] w-full rounded-b-none overflow-y-scroll absolute py-5 bottom-0 z-20">
          <p className="p-5 text-2xl text-center capitalize">pick a usermoji</p>
          <div className="flex text-4xl items-center justify-center p-2 gap-6 flex-wrap">
            {users.map((user) => (
              <div
                onClick={() => {
                  SelectUser(user);
                }}
                key={user.id}
                className=""
              >
                {user.displayEmoji}
              </div>
            ))}
          </div>
        </div>
      )}

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
        <EmojiForm fetchMsgs={fetchMsgs} user={user} />
      </div>
    </div>
  );
}

export default App;
