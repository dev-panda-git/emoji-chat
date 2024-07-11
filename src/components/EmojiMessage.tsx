export const EmojiMessage = ({ emoji, author, user, time }: any) => {
  const msgTime = new Date(time * 1000);

  return author === user.dp ? (
    <div className="relative h-24 flex items-center text-base">
      <div className=" w-max absolute right-0">
        <div className="flex gap-2 items-end">
          <div className="p-3 px-4 rounded-t-3xl rounded-bl-xl rounded border border-white/10 bg-emerald-300/30 tracking-widest text-2xl w-max">
            {emoji}
          </div>
          <div className="text-xl">{author}</div>
        </div>
        <p className="text-xs text-right mr-8 p-1">
          {msgTime.toLocaleTimeString()}
        </p>
      </div>
    </div>
  ) : (
    <div className="relative h-24 flex items-center text-base">
      <div className="">
        <div className="flex gap-2 items-end w-max">
          <div className="text-xl">{author}</div>
          <div className="p-3 rounded-t-3xl rounded-br-xl rounded border border-white/10 bg-emerald-300/30 tracking-widest text-2xl w-max">
            {emoji}
          </div>
        </div>
        <p className="text-xs p-1 ml-8">{msgTime.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};
