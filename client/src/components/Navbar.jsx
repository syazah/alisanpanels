import { Avatar, Dropdown } from "flowbite-react";
import { logo } from "../Logo.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Navbar() {
  const { currentUser, signUpCred } = useSelector((state) => state.user);
  return (
    <div className="w-full z-10 p-4 flex justify-between items-center bg-zinc-800 shadow-md shadow-zinc-900">
      <div className="w-1/3">
        <img className="w-[20%] h-[20%]" src={logo} />
      </div>

      {currentUser != null && signUpCred.status != 0 && (
        <Dropdown
          className="bg-zinc-800 p-4 border-2 border-red-500 flex flex-col w-[25vw] z-50"
          arrowIcon={false}
          inline
          label={<Avatar className="w-[3vw]" img={currentUser.profileImage} />}
        >
          <Dropdown.Header>
            <span className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="rgb(240,82,82)"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              {currentUser.name}
            </span>
            <span className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="rgb(240,82,82)"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              {currentUser.email}
            </span>
          </Dropdown.Header>
          <div className="flex p-2 justify-between items-center gap-2">
            <Link
              className="bg-red-500 w-1/2 flex justify-center p-2"
              to={"/profile"}
            >
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Link
              to={"/collections"}
              className="bg-red-500 w-1/2 flex justify-center p-2"
            >
              <Dropdown.Item>Collections</Dropdown.Item>
            </Link>
          </div>
        </Dropdown>
      )}
    </div>
  );
}

export default Navbar;
