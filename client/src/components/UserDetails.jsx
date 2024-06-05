import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [collectionsArray, setCollectionsArray] = useState([]);
  const [panelArray, setPanelArray] = useState([]);
  const correctId = id.split(":").pop();
  async function viewUsers() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/v1/user-details", {
        method: "POST",
        headers: { "COntent-Type": "application/json" },
        body: JSON.stringify({ id: correctId }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserData(data.data);
        setCollectionsArray(data.data.collectionsArray);
        setPanelArray(data.panels);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    viewUsers();
  }, []);
  return (
    <div className="w-full overflow-y-scroll bg-zinc-800">
      {isLoading ? (
        <div className="w-full h-full">
          <img className="w-[100px]" src="/loading.gif" />
        </div>
      ) : (
        <div className="w-full h-full flex justify-start items-start p-4 py-10 gap-4">
          <div className="w-1/3 h-full bg-zinc-950 border-2 border-black rounded-xl overflow-hidden">
            <div className="w-full p-4 flex flex-col justify-center items-center gap-4">
              <img
                src={userData.profileImage}
                className="w-[150px] h-[150px] rounded-full border-2 border-black"
              />
              <div className="flex flex-col justify-center items-center border-b-2 border-red-500">
                <h1 className="font-semibold text-3xl text-white">
                  {userData.name}
                </h1>
                <h2 className="font-medium text-lg text-red-600">
                  {userData._id}
                </h2>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-start">
              <div className="w-full flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 stroke-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <h2 className="text-lg font-light  text-gray-300">
                  {userData.email}
                </h2>
              </div>
              <div className="w-full flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 stroke-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>

                <h2 className="text-lg font-light text-gray-300">
                  +91 {userData.number}
                </h2>
              </div>
              <div className="w-full flex justify-start items-center gap-2">
                <h2 className="font-extrabold text-lg text-red-600">CA</h2>
                <h2 className="text-lg font-light text-gray-300">
                  {userData.createdAt}
                </h2>
              </div>
              <div className="w-full flex justify-start items-center gap-2">
                <h2 className="font-extrabold text-lg text-red-600">UA</h2>
                <h2 className="text-lg font-light text-gray-300">
                  {userData.updatedAt}
                </h2>
              </div>
            </div>
          </div>
          <div className="w-2/3 h-full flex flex-col gap-4">
            <div className="w-full bg-zinc-950 flex-col justify-start rounded-xl">
              <h1 className="border-b-2 border-red-600 text-white text-xl p-2 font-bold">
                Collections
              </h1>
              <div className="flex">
                {collectionsArray.map((collection, index) => {
                  return (
                    <div
                      className="flex p-4 flex-col justify-center items-center cursor-pointer "
                      key={index}
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
              </div>
            </div>
            <div className="w-full bg-zinc-950 flex-col justify-start rounded-xl overflow-y-scroll">
              <h1 className="border-b-2 border-red-600 text-white text-xl p-2 font-bold">
                Recent Panels
              </h1>
              <div className="w-full h-full grid grid-cols-4 p-4 gap-2 ">
                {panelArray.map((panel, index) => {
                  return (
                    <div className="grid col-span-2 " key={index}>
                      <img src={panel.panelImage} alt="loading" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
