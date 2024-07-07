import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

function App() {
  const user = {
    id: "04",
    dp: "⚽",
  };

  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [messages, setMessages] = useState([]);

  const emojiRegex =
    /(?:[\u2700-\u27bf] | [\uFE00-\uFE0F] | [\u1f300-\u1f5ff] | [\u1f600-\u1f64f] | [\u1f680-\u1f6ff] | [\u2600-\u26ff] | [\u2700-\u27bf] | [\u1f1e6-\u1f1ff] | [\u1f900-\u1f9ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1ff] | [\u1f1e6-\u1f1f])+/g;

  const handleInputChange = (event: any) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);

    if (emojiRegex.test(newInputValue)) {
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter only emojis.");
    }
  };

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

  const handleSubmit = async (e: any) => {
    console.log(inputValue);

    // if (!emojiRegex.test(inputValue)) {
    //   setErrorMessage("Please enter only emojis.");
    //   return;
    // }

    setIsPosting(true); // Set Posting state to true

    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        text: inputValue,
        author: "⚽",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }); // Add emoji to Firestore
      console.log("Document written with ID: ", docRef.id);

      fetchMsgs();
      setInputValue(""); // Clear input after successful submission
    } catch (error) {
      console.error("Error adding emoji:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const Msg = ({ emoji, author }: any) => {
    return author === user.dp ? (
      <div className="relative h-28 flex items-center">
        <div className="flex gap-2 items-end w-max absolute right-0">
          <div className="p-5 rounded-t-[2rem] rounded-bl-2xl rounded border border-white/10 bg-blue-300/30 tracking-widest text-3xl w-max">
            {emoji}
          </div>
          <div className="text-2xl">{author}</div>
        </div>
      </div>
    ) : (
      <div className="relative h-28 flex items-center">
        <div className="flex gap-2 items-end w-max">
          <div className="text-2xl">{author}</div>
          <div className="p-5 rounded-t-[2rem] rounded-br-2xl rounded border border-white/10 bg-blue-300/30 tracking-widest text-3xl w-max">
            {emoji}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black  relative ">
      <div className="w-full h-screen overflow-y-scroll max-w-2xl mx-auto relative ">
        <div className="p-2 py-5 bg-black/30 backdrop-blur-md sticky top-0 z-10">
          <h1 className="font-bold text-4xl text-center">emoji chat</h1>
          <span>{errorMessage}</span>
          <span>{isPosting ? "posting" : "not posting"}</span>
        </div>
        <div className="relative w-full p-6 md:px-10">
          {messages.map((msg) => (
            <Msg key={msg.id} emoji={msg.text} author={msg.author} />
          ))}
        </div>
        <div className="sticky  p-4 md:px-10 w-full bottom-0 z-10">
          <div className="flex relative  items-center  w-full text-2xl">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter emoji"
              className=" w-full bg-white/30 p-5 pl-8 pr-24  rounded-full backdrop-blur-md"
            />
            <button
              onClick={handleSubmit}
              className="absolute right-0 p-5 px-8 rounded-full bg-white text-black"
            >
              post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
