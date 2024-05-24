import { useEffect, useState } from "react";
import MainArea from "../components/MainArea";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SidebarTool from "../components/SidebarTool";
import { useDispatch, useSelector } from "react-redux";
import { DndContext } from "@dnd-kit/core";
import { BuildPanelIcons } from "../redux/slice/panel.slice";

function MainPage() {
  const { sideTool } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Panels";
  });

  //DND
  const [droppedDetails, setDroppedDetails] = useState([]);
  function handleDragEnd(event) {
    if (event.over) {
      const newDroppedDetail = [...droppedDetails];
      newDroppedDetail[event.over.id - 1] = {
        droppedAt: event.over.id,
        draggedElement: event.activatorEvent.srcElement.src,
      };
      setDroppedDetails(newDroppedDetail);
      dispatch(BuildPanelIcons(newDroppedDetail));
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col w-full h-screen bg-zinc-700 text-gray-50">
        <Navbar />
        <div className="flex w-[100%] h-full justify-between">
          <Sidebar />
          {sideTool && <SidebarTool />}
          <MainArea
            droppedDetails={droppedDetails}
            setDroppedDetails={setDroppedDetails}
          />
        </div>
      </div>
    </DndContext>
  );
}

export default MainPage;
