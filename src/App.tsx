import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { EmojiMessage } from "./components/EmojiMessage";
import { EmojiForm } from "./components/EmojiForm";

function App() {
  const user = {
    id: "04",
    dp: "🍿",
  };

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMsgs = async () => {
    await getDocs(collection(db, "messages")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(newData);
      console.log(messages, newData);
    });
  };

  useEffect(() => {
    fetchMsgs();
  }, []);

  const sortedMessages = messages.sort((messageA, messageB) => {
    return new Date(messageA.createdAt) - new Date(messageB.createdAt);
  });

  console.log(sortedMessages);

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
      <div className="w-full h-screen overflow-y-scroll max-w-2xl mx-auto relative ">
        <div className="p-2 py-5 bg-black/30 backdrop-blur-md sticky top-0 z-10">
          <h1 className="font-bold text-4xl text-center">💬</h1>
        </div>
        <div className="relative w-full p-3 md:px-10">
          {sortedMessages.map((msg) => (
            <EmojiMessage
              key={msg.id}
              emoji={msg.text}
              author={msg.author}
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
