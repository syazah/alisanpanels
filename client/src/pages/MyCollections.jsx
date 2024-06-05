import { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function MyCollections() {
  const [panelImageArray, setPanelImageArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collectionsArray, setCollectionsArray] = useState([]);
  const [panelsPopupOpen, setPanelsPopupOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [panelArray, setPanelArray] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const panelRef = useRef([]);
  const [currentCollectionChosed, setCurrentCollectionChosed] = useState("");

  //LOAD IMAGE
  const loadImage = async (imageUrl) => {
    let imageUrlFetched = await fetch(imageUrl);
    let blob = await imageUrlFetched.blob();
    let fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    let file = new File([blob], fileName, { type: blob.type });
    setPanelImageArray((panelImageArray) => [
      ...panelImageArray,
      URL.createObjectURL(file),
    ]);
  };
  //fetch panels
  async function handleFetchCollection(id) {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/panel/fetch-panels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(panelArray);
        setPanelArray(data.message);
        for (let i = 0; i < panelArray.length; i++) {
          loadImage(panelArray[i].panelImage);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  //fetch collections
  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/panel/fetch-collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      });
      const data = await res.json();
      if (res.ok) {
        setCollectionsArray(data.collectionsArray);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  //DOWNLOAD PDF
  async function handleDownloadPdf() {
    try {
      setPdfLoading(true);

      // Create a new jsPDF instance
      const doc = new jsPDF("p", "mm", "a4");

      // Add each image to the PDF
      for (let i = 0; i < panelArray.length; i++) {
        const imgElement = panelRef.current[i];
        const canvas = await html2canvas(imgElement, {
          useCors: false,
        });
        const imgData = canvas.toDataURL("image/png");

        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i !== 0) doc.addPage();
        doc.text(`Alisan Panel ${i}`, 5, 10);
        doc.text(
          `Panel Glass Color :- ${
            panelArray[i] === "#000" ? "Black" : "White"
          }`,
          5,
          15
        );
        doc.text(`Switches Used :- ${panelArray[i].panelVariant[0]}`, 5, 20);
        doc.text(`Bells Used :- ${panelArray[i].panelVariant[1]}`, 5, 25);
        doc.text(`Curtains Used :- ${panelArray[i].panelVariant[2]}`, 5, 30);
        doc.text(`Fans Used :- ${panelArray[i].panelVariant[3]}`, 5, 35);
        doc.text(`Plugs Used :- ${panelArray[i].panelVariant[4]}`, 5, 40);
        doc.text(`Dimmers Used :- ${panelArray[i].panelVariant[5]}`, 5, 45);
        doc.addImage(
          imgData,
          "PNG",
          40,
          pdfHeight / 2,
          pdfWidth / 2,
          pdfHeight / 2
        );
      }
      // Save the PDF
      doc.save("panels.pdf");
      setPdfLoading(false);
    } catch (error) {
      console.log(error);
      setPdfLoading(false);
    }
  }
  //   EFFECT
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, panelArray]);

  return (
    <div className="w-full h-[100vh] bg-zinc-800 p-4 flex flex-col">
      <div className="flex justify-start w-full">
        <h1 className="text-2xl text-white font-semibold border-b border-red-600">
          My Collections
        </h1>
      </div>
      {!loading && collectionsArray.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center flex-col">
          <h1 className="font-bold text-2xl text-red-600 border-b-2 border-red-600">
            No Collection Found
          </h1>
          <p className="text-lg font-medium text-white">
            Add a new collection by visiting the home page.{" "}
          </p>
        </div>
      ) : (
        <div className="flex w-full h-full">
          {loading ? (
            <div className="flex w-full h-full justify-center items-center">
              <img src={"/loading.gif"} />
            </div>
          ) : (
            // MAIN COLLECTION ARRAY

            <div className="relative flex w-full h-full justify-start items-start ">
              {/* COLLECTION  */}
              {collectionsArray.map((collection, index) => {
                return (
                  <div
                    className="flex p-4 flex-col justify-center items-center cursor-pointer "
                    key={index}
                    onClick={() => {
                      setPanelsPopupOpen(true);
                      setCurrentCollectionChosed(collection._id);
                      handleFetchCollection(collection._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke=""
                      className="size-20 stroke-white bg-red-600 p-4 rounded-full hover:bg-zinc-800 hover:stroke-red-600 transition-all duration-200"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                      />
                    </svg>

                    <h1 className="text-white font-semibold text-xl capitalize">
                      {collection.name.split("/").pop()}
                    </h1>
                  </div>
                );
              })}

              {/* PANEL  */}
              {panelsPopupOpen && (
                <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center ">
                  {loading ? (
                    <div className="flex w-full h-full justify-center items-center">
                      <img src={"/loading.gif"} />
                    </div>
                  ) : (
                    <div className="w-[80%] h-[80vh] bg-zinc-900 border-[1px] border-red-600 rounded-2xl overflow-y-scroll overflow-x-hidden">
                      <div className="flex p-4 justify-end cursor-pointer sticky top-0 gap-2">
                        {pdfLoading ? (
                          <div className="w-10 p-2 bg-zinc-900 rounded-full">
                            <img src="/loading.gif" />
                          </div>
                        ) : (
                          <svg
                            onClick={handleDownloadPdf}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke=""
                            className="size-10 stroke-white hover:stroke-red-600 p-[4px] bg-red-600 rounded-full  hover:bg-white transition-all duration-200"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                            />
                          </svg>
                        )}

                        <svg
                          onClick={() => {
                            setPanelsPopupOpen(false), setPanelImageArray([]);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke=""
                          className="size-10 stroke-white hover:stroke-red-600 p-[4px] bg-red-600 rounded-full  hover:bg-white transition-all duration-200"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                      {panelImageArray.length === 0 ? (
                        <div className="w-full gap-8 flex flex-col justify-center items-center">
                          <div className="text-2xl text-white">
                            Want To View The Collection ?
                          </div>
                          <button
                            onClick={() =>
                              handleFetchCollection(currentCollectionChosed)
                            }
                            className="p-2 px-10 rounded-full bg-red-600"
                          >
                            Yes
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full grid grid-cols-4 p-4 gap-2">
                          {panelImageArray.map((panel, index) => {
                            return (
                              <div className="grid col-span-2 " key={index}>
                                <img
                                  ref={(el) => (panelRef.current[index] = el)}
                                  src={panel}
                                  alt="loading"
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyCollections;
