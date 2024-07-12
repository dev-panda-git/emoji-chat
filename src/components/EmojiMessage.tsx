export const EmojiMessage = ({ emoji, author, user, time }: any) => {
  const msgTime = new Date(time * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return author === user.dp ? (
    <div className="relative h-[6.5rem] flex items-center text-base">
      <div className=" w-max absolute right-0">
        <div className="flex gap-2 items-end">
          <div className="p-4 px-4 rounded-t-3xl rounded-bl-xl rounded  bg-white/20 tracking-[1rem] text-2xl w-max">
            {emoji}
          </div>
          <div className="text-xl">{author}</div>
        </div>
        <p className="text-xs text-right mr-8 p-1">{msgTime}</p>
      </div>
    </div>
  ) : (
    <div className="relative h-[6.5rem] flex items-center text-base">
      <div className="">
        <div className="flex gap-2 items-end w-max">
          <div className="text-xl">{author}</div>
          <div className="p-4 rounded-t-3xl rounded-br-xl rounded  bg-white/20 tracking-[1rem] text-2xl w-max">
            {emoji}
          </div>
        </div>
        <p className="text-xs p-1 ml-8">{msgTime}</p>
      </div>
    </div>
  );
};
