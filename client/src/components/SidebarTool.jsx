import { useDispatch, useSelector } from "react-redux";
import {
  BuildPanelFrame,
  BuildPanelGlass,
  BuildPanelSize,
  BuildPanelVariant,
  BuildPanelWall,
} from "../redux/slice/panel.slice";
import { variantData } from "../utils/variant";
import { nanoid } from "@reduxjs/toolkit";
import { icons } from "../utils/icons";
import Draggable from "./Draggable";
import { useState } from "react";

const sideToolSelector = [
  <SizeSelector key={0} />,
  <VariantsSelector key={1} />,
  <GlassSelector key={2} />,
  <FrameSelector key={3} />,
  <IconSelector key={4} />,
  <WallSelector key={5} />,
];
function SidebarTool() {
  const { currentOpen } = useSelector((state) => state.config);
  return (
    <div className="w-[15%] h-full bg-zinc-900">
      {sideToolSelector[currentOpen]}
    </div>
  );
}

function SizeSelector() {
  const dispatch = useDispatch();
  return (
    <div className="w-[100%] h-full">
      <div
        onClick={() => dispatch(BuildPanelSize(2))}
        className="w-[100%] h-[20%] flex justify-center items-center hover:bg-zinc-950 cursor-pointer"
      >
        <h3 className="text-lg">2 Module</h3>
      </div>
      <div
        onClick={() => dispatch(BuildPanelSize(4))}
        className="w-[100%] h-[20%] flex justify-center items-center hover:bg-zinc-950 cursor-pointer"
      >
        <h3 className="text-lg">4 Module</h3>
      </div>
      <div
        onClick={() => dispatch(BuildPanelSize(6))}
        className="w-[100%] h-[20%] flex justify-center items-center hover:bg-zinc-950 cursor-pointer"
      >
        <h3 className="text-lg">6 Module</h3>
      </div>
      <div
        onClick={() => dispatch(BuildPanelSize(8))}
        className="w-[100%] h-[20%] flex justify-center items-center hover:bg-zinc-950 cursor-pointer"
      >
        <h3 className="text-lg">8 Module</h3>
      </div>
    </div>
  );
}

function VariantsSelector() {
  const { panelSize } = useSelector((state) => state.panel);
  const dispatch = useDispatch();
  return (
    <div className="w-full h-full overflow-y-scroll">
      {/*VARIANTS*/}
      {variantData[panelSize / 2 - 1].map((object) => {
        return (
          <>
            <div
              key={nanoid()}
              style={panelSize === 4 ? { padding: "10px" } : {}}
              className="w-full flex p-4 justify-start items-center hover:bg-zinc-950 cursor-pointer border-b-2 border-zinc-950"
              onClick={() => dispatch(BuildPanelVariant(object))}
            >
              <h3 className="text-md">
                {object.switches > 0 && `${object.switches} switch `}
                {object.bells > 0 && ` ${object.bells} bell`}
                {object.curtains > 0 && ` ${object.curtains} curtain`}
                {object.fans > 0 && ` ${object.fans} fan`}
                {object.plugs > 0 && ` ${object.plugs} plug`}
                {object.dimmers > 0 && ` ${object.dimmers} dimmer`}
              </h3>
            </div>
          </>
        );
      })}
    </div>
  );
}

function GlassSelector() {
  const dispatch = useDispatch();
  return (
    <div className="w-full h-full flex-col">
      <div
        className="w-full flex flex-col justify-center items-center gap-4 font-semibold  border-b-2 border-zinc-950 p-4"
        onClick={() => dispatch(BuildPanelGlass("#000"))}
      >
        <div className="w-[60px] h-[60px] border-4 border-[#ccc] rounded-full bg-black cursor-pointer"></div>
        <h3>BLACK</h3>
      </div>
      <div
        className="w-full flex flex-col justify-center items-center gap-4 font-semibold  border-b-2 border-zinc-950 p-4"
        onClick={() => dispatch(BuildPanelGlass("#eee"))}
      >
        <div className="w-[60px] h-[60px] border-4 border-[#ccc] rounded-full cursor-pointer bg-[#fff]"></div>
        <h3>WHITE</h3>
      </div>
    </div>
  );
}

function FrameSelector() {
  const dispatch = useDispatch();
  return (
    <div className="w-full h-full flex-col">
      <div
        className="w-full flex flex-col justify-center items-center gap-4 font-semibold  border-b-2 border-zinc-950 p-4"
        onClick={() => dispatch(BuildPanelFrame("#28282b"))}
      >
        <div className="w-[60px] h-[60px] border-4 border-[#ccc] rounded-full bg-[#28282b] cursor-pointer"></div>
      </div>
      <div
        className="w-full flex flex-col justify-center items-center gap-4 font-semibold  border-b-2 border-zinc-950 p-4"
        onClick={() => dispatch(BuildPanelFrame("#aaa"))}
      >
        <div className="w-[60px] h-[60px] border-4 border-[#ccc] rounded-full cursor-pointer bg-[#aaa]"></div>
      </div>
      <div
        className="w-full flex flex-col justify-center items-center gap-4 font-semibold  border-b-2 border-zinc-950 p-4"
        onClick={() => dispatch(BuildPanelFrame("#e2b144"))}
      >
        <div className="w-[60px] h-[60px] border-4 border-[#ccc] rounded-full cursor-pointer bg-[#e2b144]"></div>
      </div>
      <div
        className="w-full flex flex-col justify-center items-center gap-4 font-semibold  border-b-2 border-zinc-950 p-4"
        onClick={() => dispatch(BuildPanelFrame("#000"))}
      >
        <div className="w-[60px] h-[60px] border-4 border-[#ccc] rounded-full cursor-pointer bg-[#000]"></div>
      </div>
    </div>
  );
}
function IconSelector() {
  const [openId, setOpenId] = useState(-1);
  return (
    <div className="flex flex-col">
      {/* LIGHT ICONS  */}
      <div className="w-full h-full flex-col gap-4 p-2">
        <h3
          onClick={() => {
            setOpenId(0);
          }}
          className="text-black text-center bg-red-500 font-semibold text-xl cursor-pointer p-2 flex justify-start items-center gap-2"
        >
          Lights
          {openId === 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </h3>
        {openId === 0 && (
          <div className="z-20 w-full flex flex-wrap gap-2 justify-center">
            {icons[0].map((icon, index) => {
              return <Draggable key={index} id={icon.id} icon={icon} />;
            })}
          </div>
        )}
      </div>
      {/* FANS ICONS  */}
      <div className="w-full h-full flex-col gap-4 p-2">
        <h3
          onClick={() => {
            setOpenId(1);
          }}
          className="text-black text-center bg-red-500 font-semibold text-xl cursor-pointer p-2 flex justify-start items-center gap-2"
        >
          Fans
          {openId === 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </h3>
        {openId === 1 && (
          <div className="z-20 w-full flex flex-wrap gap-2 justify-center">
            {icons[1].map((icon, index) => {
              return <Draggable key={index} id={icon.id} icon={icon} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
function WallSelector() {
  const dispatch = useDispatch();
  return (
    <div className="w-full h-full flex-col">
      <div className="w-full flex flex-col justify-center items-center gap-4 font-semibold  border-b-2 border-zinc-950 p-4">
        <div
          className="w-[60px] h-[60px] border-4 border-[#ccc] rounded-full bg-[url('/Walls/wall01.jpg')] cursor-pointer object-cover"
          onClick={() => dispatch(BuildPanelWall("/Walls/wall01.jpg"))}
        ></div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 font-semibold  border-b-2 border-zinc-950 p-4">
        <div
          className="w-[60px] h-[60px] border-4 border-[#ccc] rounded-full bg-[url('/Walls/wall02.jpg')] cursor-pointer object-cover"
          onClick={() => dispatch(BuildPanelWall("/Walls/wall02.jpg"))}
        ></div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 font-semibold  border-b-2 border-zinc-950 p-4">
        <div
          className="w-[60px] h-[60px] border-4 border-[#ccc] rounded-full bg-[url('/Walls/wall03.png')] cursor-pointer object-cover"
          onClick={() => dispatch(BuildPanelWall("/Walls/wall03.png"))}
        ></div>
      </div>
    </div>
  );
}

export default SidebarTool;
