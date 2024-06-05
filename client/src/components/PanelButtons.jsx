function PanelButtons({ type, width, count }) {
  return (
    <div
      style={{ width: width, height: width }}
      className="w-[60px] h-[58px] overflow-hidden flex justify-center items-center"
    >
      {type === "Plugs" && (
        <img
          className="w-full h-full object-contain text-xs"
          src="/Accessories/socket2.png"
          alt={`${type} loading`}
        />
      )}
      {type === "Curtains" && (
        <div className="flex flex-col w-full h-full justify-center items-center gap-8">
          <div className="w-[35%] h-[35%] border-2 border-[#1AE0FA] flex justify-center items-center rounded-full p-2">
            <img
              className="w-full h-full object-contain text-xs"
              src="/Curtain/curtains.png"
              alt={`${type} loading`}
            />
          </div>
          <div className="w-[35%] h-[35%] border-2 border-[#1AE0FA] flex justify-center items-center rounded-full p-2">
            <img
              className="w-full h-full object-contain text-xs"
              src="/Curtain/curtains2.png"
              alt={`${type} loading`}
            />
          </div>
        </div>
      )}
      {type === "Bells" && (
        <div className="w-[35%] h-[35%] border-2 border-[#1AE0FA] flex justify-center items-center rounded-full p-2">
          <img
            className="w-full h-full object-contain text-xs"
            src="/Bell/bell.png"
            alt={`${type} loading`}
          />
        </div>
      )}

      {type === "Fans" && (
        <div className="w-full h-full flex flex-col justify-center items-center gap-9">
          <div className="w-[35%] h-[35%] border-2 border-[#1AE0FA] flex justify-center items-center rounded-full p-2">
            <img
              className="w-full h-full object-contain text-xs"
              src="/Fan/fans01.png"
              alt={`${type} loading`}
            />
          </div>
          <div className="w-[35%] h-[35%] border-2 border-[#1AE0FA] rounded-full  flex justify-center items-center p-2">
            <img
              className="w-full h-full object-contain text-xs"
              src="/Fan/fans01.png"
              alt={`${type} loading`}
            />
          </div>
        </div>
      )}
      {type === "Dimmers" && (
        <div className={`flex gap-8 justify-center items-center`}>
          <div className="w-1/2 h-full flex flex-col gap-10 justify-center items-center">
            <div
              className={`${count > 1 ? "w-[40px]" : "w-[50px]"} ${
                count > 1 ? "h-[40px]" : "h-[50px]"
              } flex justify-center items-center rounded-full border-2 border-[#1AD5F4]`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#1AD5F4"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            </div>
            <div
              className={`${count > 1 ? "w-[40px]" : "w-[50px]"} ${
                count > 1 ? "h-[40px]" : "h-[50px]"
              } flex justify-center items-center rounded-full border-2 border-[#1AD5F4]`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#1AD5F4"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center items-center gap-2">
            <div className="w-[18px] h-[18px] rounded-full border-2 border-[#1AD5F4]"></div>
            <div className="w-[18px] h-[18px] rounded-full border-2 border-[#1AD5F4]"></div>
            <div className="w-[18px] h-[18px] rounded-full border-2 border-[#1AD5F4]"></div>
            <div className="w-[18px] h-[18px] bg-[#1AD5F4] rounded-full border-2 border-[#1AD5F4]"></div>
            <div className="w-[18px] h-[18px] bg-[#1AD5F4] rounded-full border-2 border-[#1AD5F4]"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PanelButtons;
