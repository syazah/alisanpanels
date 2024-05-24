function PanelButtons({ type }) {
  return (
    <div className="w-[50px] h-[50px] overflow-hidden border-2 border-[#1AE0FA] flex justify-center items-center">
      {type === "Plugs" && (
        <img
          className="w-full h-full object-contain text-xs"
          src="/Accessories/icon2.png"
          alt={`${type} loading`}
        />
      )}
      {type === "Curtains" && (
        <img
          className="w-full h-full object-contain text-xs"
          src="/Curtain/curtains.png"
          alt={`${type} loading`}
        />
      )}
      {type === "Bells" && (
        <img
          className="w-full h-full object-contain text-xs"
          src="/Bell/bell.png"
          alt={`${type} loading`}
        />
      )}
      {type === "Fans" && (
        <img
          className="w-full h-full object-contain text-xs"
          src="/Fan/fans17.png"
          alt={`${type} loading`}
        />
      )}
      {type === "Dimmers" && (
        <img
          className="w-full h-full object-contain text-xs"
          src="/Dimmer/dimmer.png"
          alt={`${type} loading`}
        />
      )}
    </div>
  );
}

export default PanelButtons;
