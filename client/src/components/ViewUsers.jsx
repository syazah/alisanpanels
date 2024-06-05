import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewUsers() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getAllUsers() {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/view-users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setUserData(data.data);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="w-full bg-zinc-900">
      <div className="flex flex-col p-4 justify-center items-center ">
        {loading ? (
          <img src="/loading.gif" className="w-[100px]" />
        ) : (
          <>
            <div className="flex gap-2 justify-center items-center overflow-y-scroll">
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
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>

              <h1 className="text-red-600 font-bold text-lg">ADMINS</h1>
            </div>
            <Suspense fallback={"Loading ... "}>
              {userData.map((user, index) => {
                return <AdminList key={index} user={user} />;
              })}
            </Suspense>

            {/* USERS  */}
            <div className="flex gap-2 justify-center items-center">
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
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <h1 className="text-red-600 font-bold">USERS</h1>
            </div>
            <Suspense fallback={"Loading ... "}>
              {userData.map((user, index) => {
                return <UserList key={index} user={user} />;
              })}
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}

function AdminList({ user }) {
  if (user.admin) {
    return (
      <div className="w-full py-4">
        <div className="flex gap-2">
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
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <h2 className="text-red-600 capitalize text-xl">{user.name}</h2>
        </div>
      </div>
    );
  }
}
function UserList({ user }) {
  if (!user.admin) {
    return (
      <div className="w-full p-4 border-b-[1px] border-zinc-800 flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
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
                d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
              />
            </svg>
            <h2 className="text-sm text-red-600">{user._id}</h2>
          </div>
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <h4 className="text-white capitalize text-sm">{user.name}</h4>
          </div>
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>

            <h3 className="text-white text-sm">{user.email}</h3>
          </div>
        </div>
        {/* DETAILS  */}
        <div className="flex justify-center items-center bg-red-600 w-[150px] h-[40px] rounded-full">
          <Link
            to={`/admin/user-detail/:${user._id}`}
            className="text-white text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    );
  }
}

export default ViewUsers;
