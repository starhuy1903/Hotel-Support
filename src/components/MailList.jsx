const MailList = () => {
  return (
    <div className="w-full mt-14 bg-teal-600 text-white flex flex-col items-center gap-5 p-14">
      <h1 className="font-bold text-3xl">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInputContainer">
        <input
          type="text"
          placeholder="Your Email"
          className="w-[300px] h-[50px] p-3 border-none mr-3 rounded-md text-black outline-none"
        />
        <button className="h-[50px] bg-amber-500 border-none rounded-md cursor-pointer p-3">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default MailList;
