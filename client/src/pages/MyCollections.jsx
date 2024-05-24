import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function MyCollections() {
  const [loading, setLoading] = useState(false);
  const [collectionsArray, setCollectionsArray] = useState([]);
  const [panelsPopupOpen, setPanelsPopupOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [panelArray, setPanelArray] = useState([]);

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
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  //   EFFECT
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  return (
    <div className="w-full h-[100vh] bg-zinc-800 p-4 flex flex-col">
      <div className="flex justify-start w-full">
        <h1 className="text-2xl text-white font-semibold border-b border-red-600">
          My Collections
        </h1>
      </div>
      <div className="flex w-full h-full">
        {loading ? (
          <div className="flex w-full h-full justify-center items-center">
            <img src={"/loading.gif"} />
          </div>
        ) : (
          // MAIN COLLECTION ARRAY

          <div className="relative flex w-full h-full justify-start items-start">
            {/* COLLECTION  */}
            {collectionsArray.map((collection, index) => {
              return (
                <div
                  className="flex p-4 flex-col justify-center items-center cursor-pointer"
                  key={index}
                  onClick={() => {
                    setPanelsPopupOpen(true);
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
              <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
                {loading ? (
                  <div className="flex w-full h-full justify-center items-center">
                    <img src={"/loading.gif"} />
                  </div>
                ) : (
                  <div
                    className="w-[80%] h-[80vh] bg-zinc-900 border-[1px] border-red-600 rounded-2xl"
                    onClick={() => setPanelsPopupOpen(false)}
                  >
                    <div className="flex p-4 justify-end cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke=""
                        className="size-10 stroke-red-600 hover:stroke-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>

                    <div className="grid grid-rows-4 grid-cols-4"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCollections;
