import { useDispatch, useSelector } from "react-redux";
import { startBuildingPanel } from "../redux/slice/config.slice";
const sideButtons = [
  {
    id: 0,
    name: "Size",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="rgb(189,36,36)"
        className="w-10 h-10"
      >
        <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
      </svg>
    ),
  },
  {
    id: 1,
    name: "Variant",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="rgb(189,36,36)"
        className="w-10 h-10"
      >
        <path
          fillRule="evenodd"
          d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Glass",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="rgb(189,36,36)"
        className="w-10 h-10"
      >
        <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
        <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
        <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Frame",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="rgb(189,36,36)"
        className="w-10 h-10"
      >
        <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Icons",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="rgb(189,36,36)"
        className="w-10  h-10"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: 5,
    name: "Wall",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="rgb(189,36,36)"
        className="w-10 h-10"
      >
        <path d="M15 3.75H9v16.5h6V3.75ZM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5ZM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 0 1-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875Z" />
      </svg>
    ),
  },
];
function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="w-[10%] bg-zinc-800 h-full flex flex-col">
      {currentUser !== null &&
        sideButtons.map((btn, index) => {
          return <SidebarButton sideBtn={btn} key={index} />;
        })}
    </div>
  );
}

function SidebarButton({ sideBtn }) {
  const { currentOpen } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  function handleClick(e) {
    dispatch(startBuildingPanel(e.id));
  }
  return (
    <div
      onClick={() => handleClick(sideBtn)}
      style={
        sideBtn.id <= currentOpen + 1
          ? {}
          : { pointerEvents: "none", opacity: "0.2" }
      }
      className="w-full p-4 cursor-pointer hover:bg-zinc-900 flex flex-col justify-center items-center"
    >
      {sideBtn.Icon}
      <h2>{sideBtn.name}</h2>
    </div>
  );
}

export default Sidebar;
