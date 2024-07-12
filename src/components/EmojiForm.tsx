import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";

export const EmojiForm = ({ fetchMsgs }: any) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [messages, setMessages] = useState([]);

  const emojiRegex = /\p{Emoji_Presentation}/gu;
  const handleInputChange = (event: any) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);

    if (emojiRegex.test(newInputValue)) {
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter only emojis.");
    }
    console.log(errorMessage);
  };

  const handleSubmit = async (e: any) => {
    console.log(inputValue);

    // if (!emojiRegex.test(inputValue)) {
    //   setErrorMessage("Please enter only emojis.");
    //   return;
    // }

    setIsPosting(true); // Set Posting state to true

    e.preventDefault();

    try {
      const d = new Date();
      let time = d.getTime();
      console.log(time);

      const docRef = await addDoc(collection(db, "messages"), {
        text: inputValue,
        author: "🎲",
        createdAt: time,
      }); // Add emoji to Firestore
      console.log("Document written with ID: ", docRef.id);

      fetchMsgs();
      setInputValue(""); // Clear input after successful submission
    } catch (error) {
      console.error("Error adding emoji:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="sticky  p-4 md:px-10 w-full max-w-sm  right-0 bottom-0  z-10">
      <div className="flex relative  items-center  w-full text-2xl">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="🖋"
          className=" w-full bg-white/20 p-4 pl-6 pr-24 rounded-full backdrop-blur-md"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-2 p-2 px-5 rounded-full bg-black text-2xl"
        >
          ✒
        </button>
      </div>
    </div>
  );
};
