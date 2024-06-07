import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Droppable from "./Droppable";
import { nanoid } from "@reduxjs/toolkit";

//PDF
import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import { logo } from "../Logo";
import PanelButtons from "./PanelButtons";
import { UpdateCollectionsArray } from "../redux/slice/panel.slice";

function MainArea({ droppedDetails, setDroppedDetails }) {
  const pdfRef = useRef();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentOpen } = useSelector((state) => state.config);
  const { panelSize, panelGlass, panelFrame, panelVariant, panelWall } =
    useSelector((state) => state.panel);
  const numSwitches = panelVariant.switches;
  const numBells = panelVariant.bells;
  const numCurtains = panelVariant.curtains;
  const numFans = panelVariant.fans;
  const numPlugs = panelVariant.plugs;
  const numDimmers = panelVariant.dimmers;

  const buttonItems = [
    numBells > 0 && { count: numBells, type: "Bells" },
    numCurtains > 0 && { count: numCurtains, type: "Curtains" },
    numFans > 0 && { count: numFans, type: "Fans" },
    numPlugs > 0 && { count: numPlugs, type: "Plugs" },
    numDimmers > 0 && { count: numDimmers, type: "Dimmers" },
  ].filter(Boolean);

  const droppablesArray = [];
  const panelData = useSelector((state) => state.panel);
  const completeData = { ...panelData, user: currentUser };
  let buttonItemPresent = false;
  const [loading, setLoading] = useState(false);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [popupForCollection, setPopupForCollection] = useState(false);
  const [popupError, setPopupError] = useState("");
  const [addNewCollectionPopup, setAddNewCollectionPopup] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [chosenExisting, setChosenExisting] = useState("");
  let showModuleBorder = false;
  const [addToExisting, setAddToExisting] = useState(false);

  if (
    numBells > 0 ||
    numCurtains > 0 ||
    numPlugs > 0 ||
    numDimmers > 0 ||
    numFans > 0
  ) {
    buttonItemPresent = true;
  }

  // DOWNLOAD PDF
  function downloadPdf() {
    const input = pdfRef.current;
    html2canvas(input, {
      useCORS: true,
      logging: true,
      letterRendering: 1,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "panelImage.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  //SEND TO DATABASE THEN DOWNLOAD PDF
  async function handleSendData() {
    try {
      setLoading(true);
      const input = pdfRef.current;
      const canvas = await html2canvas(input, {
        useCORS: true,
        logging: true,
        letterRendering: 1,
      });
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob);
        const res = await fetch("/api/v1/panel/upload-image", {
          method: "POST",
          body: formData,
        });
        const { url } = await res.json();
        const finalData = { ...completeData, url };
        const res2 = await fetch("/api/v1/panel/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        });
        if (res2.ok) {
          downloadPdf();
        }
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //CREATE A COLLECTION
  async function handleCreateNewCollection() {
    try {
      setCollectionLoading(true);
      const collectionCompleteData = {
        userId: completeData.user._id,
        collectionName: newCollectionName.split(" ").join(""),
      };
      const newRes = await fetch("/api/v1/panel/add-collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collectionCompleteData),
      });
      const newData = await newRes.json();
      if (newData.success === false) {
        alert(newData.message);
        setCollectionLoading(false);
        setNewCollectionName("");
      }
      if (newRes.ok) {
        setNewCollectionName("");
        setCollectionLoading(false);
        return setAddNewCollectionPopup(false);
      }
      setCollectionLoading(false);
    } catch (error) {
      setPopupError(JSON.stringify(error));
      setCollectionLoading(false);
    }
  }

  //ADD TO EXISTING COLLECTION
  async function fetchAllCollections() {
    try {
      setCollectionLoading(true);
      const res = await fetch("/api/v1/panel/fetch-collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(UpdateCollectionsArray(data.collectionsArray));
      }
      setAddToExisting(true);
      setCollectionLoading(false);
    } catch (error) {
      console.log(error);
      setPopupError(error);
      setCollectionLoading(false);
    }
  }

  async function handleAddToExisting() {
    try {
      setCollectionLoading(true);
      const input = pdfRef.current;
      const canvas = await html2canvas(input, {
        useCORS: true,
        logging: true,
        letterRendering: 1,
      });
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob);
        formData.append("folder", chosenExisting);
        const res = await fetch("/api/v1/panel/upload-image", {
          method: "POST",
          body: formData,
        });
        const { url } = await res.json();
        const oneFinalData = { ...completeData, url };
        const res2 = await fetch("/api/v1/panel/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(oneFinalData),
        });
        const data = await res2.json();
        if (data.success === false) {
          alert(data.message);
          setNewCollectionName("");
        }
        const finalData = {
          userId: completeData.user._id,
          chosenCollection: chosenExisting,
          panelId: data.panelId,
          url,
        };
        if (res2.ok) {
          const res3 = await fetch("/api/v1/panel/add-to-collection", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalData),
          });
          const data2 = await res3.json();
          if (res3.ok) {
            dispatch(UpdateCollectionsArray(data2.message.collectionArray));
            setCollectionLoading(false);
            return setAddToExisting(false);
          }
        }
      });
    } catch (error) {
      setCollectionLoading(false);
      setPopupError(error);
      console.log(error);
    }
  }

  for (let i = 0; i < numSwitches; i++) {
    droppablesArray.push(i + 1);
  }
  if (buttonItems.length > 0 || droppablesArray.length > 0) {
    showModuleBorder = true;
  }

  return (
    <>
      <div
        style={{ backgroundImage: `url(${panelWall})` }}
        className="relative w-[75%] h-full justify-center items-center flex flex-col gap-6 bg-cover bg-no-repeat"
      >
        {/* POPUP  */}
        {popupForCollection && (
          <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full z-50 bg-zinc-100 bg-opacity-25">
            <div className="relative w-[50%] min-h-[50%] bg-zinc-800 rounded-xl p-4 shadow-2xl border-red-600 border-2 flex flex-col  justify-evenly">
              <div
                className="absolute flex justify-end top-0 right-0 p-2"
                onClick={() => {
                  setAddToExisting(false);
                  setAddNewCollectionPopup(false);
                  setPopupForCollection(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 hover:stroke-white stroke-red-600 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              {addNewCollectionPopup ? (
                <>
                  <h1 className="font-semibold text-white text-2xl border-b-[1px] border-zinc-600">
                    Create A New Collection
                  </h1>
                  <p className="font-light mt-4">
                    Just choose a name which is not already chosen for your
                    collection and then we will create a collection by your
                    chosen name which can be viewed in the collection section of
                    the panel.
                  </p>
                  <input
                    className="mt-8 p-2 rounded-xl bg-zinc-600 border-2 border-zinc-900 text-white"
                    placeholder="Collection Name"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                  />
                  <p className="text-xs font-extralight text-red-400 mb-2">
                    {popupError !== ""
                      ? popupError
                      : "*Make Sure Name Is Unique"}
                  </p>
                  <button
                    onClick={handleCreateNewCollection}
                    className="bg-red-600 rounded-full p-2"
                  >
                    {collectionLoading ? "Loading ... " : "CREATE"}
                  </button>
                </>
              ) : addToExisting ? (
                <>
                  <h1 className="font-semibold text-white text-2xl border-b-[1px] border-zinc-600">
                    Add To Existing Collection
                  </h1>
                  <p className="font-light mt-4">
                    Please choose the collection name so that your panel can be
                    added inside the collection that you have chosen after which
                    the panel will be visible inside the former collection
                  </p>
                  <select
                    className="mt-8 p-2 rounded-xl bg-zinc-600 border-2 border-zinc-900 text-white"
                    placeholder="Collection Name"
                    value={chosenExisting}
                    onChange={(e) => setChosenExisting(e.target.value)}
                  >
                    <option value={""}>------------------</option>
                    {panelData.collectionsArray.map((item, index) => {
                      const collectionName = item?.name?.split("/").pop();
                      return (
                        <option key={index} value={collectionName}>
                          {collectionName}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-xs font-extralight text-red-400 mb-2">
                    {popupError !== ""
                      ? popupError
                      : "*Make Sure Name Is Unique"}
                  </p>
                  <button
                    onClick={handleAddToExisting}
                    className="bg-red-600 rounded-full p-2"
                  >
                    {collectionLoading ? "Loading ... " : "ADD"}
                  </button>
                </>
              ) : (
                <>
                  <h1 className="font-semibold text-white text-2xl border-b-[1px] border-zinc-600">
                    Which Collection ?
                  </h1>
                  <p className="font-light mt-4">
                    Add a new collection or add the panel to an existing panel
                    collection. The added panel will be visible in the My
                    Collection section which can be accessed by clicking the
                    profile Icon in the navbar.
                  </p>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setAddNewCollectionPopup(true)}
                      className="py-2 px-4 border-2 border-red-600 rounded-full  text-red-600 hover:bg-red-600 hover:text-white transition-all duration-100"
                    >
                      Create Collection
                    </button>
                    <button
                      onClick={fetchAllCollections}
                      className="py-2 px-4 bg-red-600 rounded-full hover:bg-red-800 transition-all duration-150"
                    >
                      {collectionLoading ? "Loading ... " : "Add To Existing"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {/* TEMP HELLO  */}
        {currentOpen === -1 && (
          <>
            <h1 className="text-3xl font-bold">
              Hello {currentUser != null ? currentUser.name : "User"} !!{" "}
            </h1>
            <h2 className="w-[500px] text-center text-xl">
              {currentUser != null
                ? "Let's Start By Selecting The Size For Your Panel, For This You Need To Select The Size Option From The Sidebar On The Left."
                : "We are happy to help you build your own touch panel with good varients. To continue you must be logged into your account"}
            </h2>
            {currentUser === null && (
              <Link
                to={"/signin"}
                className="flex justify-center w-24 bg-red-600 p-2 text-black font-semibold cursor-pointer shadow-[0px_5px] shadow-zinc-800 hover:shadow-none"
              >
                SIGN IN
              </Link>
            )}
          </>
        )}

        {/*PANEL*/}
        {currentOpen > -1 && (
          <div
            ref={pdfRef}
            style={{
              width: `${
                panelSize <= 4
                  ? 2 * 100 + (panelSize / 2) * 100
                  : 2 * 160 + (panelSize / 2) * 100
              }px`,
              backgroundColor: panelGlass,
              height: `${panelSize <= 4 ? 290 : 280}px`,
              borderColor: panelFrame,
            }}
            className={`panel relative border-[3px] bg-zinc-950 rounded-lg  transition-all flex justify-center items-center p-4 ${
              !showModuleBorder ? "gap-4" : ""
            }`}
          >
            <div className="absolute clip-triangle z-[10] top-0 left-0 bg-[rgb(255,255,255,0.5)] w-[150px] h-full"></div>

            {/* PANEL SIZE 2  */}
            {panelSize === 2 && (
              <div
                className={`flex justify-center items-center w-[70%] h-[70%] ${
                  !showModuleBorder ? "border-zinc-400 border-[1px]" : ""
                } gap-4 gap-y-1 p-0 px-[1px] flex-wrap`}
              >
                {/* SWITCHES  */}
                {numSwitches > 0 &&
                  droppablesArray.map((item) => {
                    return (
                      <Droppable
                        setDroppedDetails={setDroppedDetails}
                        droppedDetails={droppedDetails}
                        key={item}
                        id={item}
                      />
                    );
                  })}

                {/* PANEL BUTTONS  */}
                {buttonItems &&
                  buttonItems.map((item, index) =>
                    item.count > 0
                      ? Array.from({ length: item.count }, (_, i) => (
                          <PanelButtons
                            key={`${item.type}-${index}-${i}`}
                            type={item.type}
                            width={"100%"}
                          />
                        ))
                      : null
                  )}
              </div>
            )}
            <img className="absolute bottom-2 right-2 w-14 " src={logo} />
          </div>
        )}
      </div>

      {/* DOWNLOAD PANEL  */}

      {currentUser !== null && (
        <div className="flex flex-col">
          <button
            className="absolute bottom-10 cursor-pointer p-4 right-10 bg-red-600 text-white font-bold rounded-full transition-all duration-300 hover:bg-red-700"
            onClick={handleSendData}
          >
            {loading ? (
              "Downloading ... "
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                />
              </svg>
            )}
          </button>
          <button
            className="absolute bottom-28 cursor-pointer p-4 right-10 bg-red-600 text-white font-bold rounded-full transition-all duration-300 hover:bg-red-700"
            onClick={() => setPopupForCollection(true)}
          >
            {loading ? (
              "Adding ... "
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>
            )}
          </button>
        </div>
      )}
    </>
  );
}

export default MainArea;
