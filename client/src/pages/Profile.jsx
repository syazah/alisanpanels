import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signOutSuccess } from "../redux/slice/user.slice";
import { Link } from "react-router-dom";
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSignOut, setLoadingSignOut] = useState(false);
  const dispatch = useDispatch();
  //IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImageFileUrl(URL.createObjectURL(file));
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", imageFile);
      console.log(formData);
      const res = await fetch("/api/v1/profileimage", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data.data));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //HANDLE SIGN OUT
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      setLoadingSignOut(true);
      console.log("trying 1");
      const res = await fetch("/api/v1/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
      setLoadingSignOut(false);
    } catch (err) {
      console.log(err.message);
      setLoadingSignOut(false);
    }
  };

  return (
    <div className="flex flex-col justify-start p-12 items-center w-full h-screen bg-zinc-700 text-gray-50">
      <form className="flex flex-col w-full justify-center items-center gap-4">
        <h1 className="text-center text-2xl uppercase">{currentUser.name}👋</h1>
        {/* PROFILE IMAGE  */}
        <label className="relative w-32 h-32 my-4 self-center cursor-pointer rounded-full overflow-hidden shadow-md border-4 border-red-600 group ">
          <img
            src={imageFileUrl || currentUser.profileImage}
            className="rounded-full w-full h-full object-cover"
          />
          <div className="absolute top-[0%] left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-200 flex justify-center items-center text-black group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-10 h-10 transition duration-400 opacity-0 group-hover:opacity-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        {/* PROFILE INPUTS */}
        <label className="w-full flex flex-col justify-center gap-2 items-center">
          <h3>Your Current Email :- </h3>

          <input
            className="w-1/2 p-2 bg-zinc-800 focus:outline-none"
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
          />
        </label>
        <label className="w-full flex flex-col justify-center gap-2 items-center">
          <h3>Your Current Phone Number :- </h3>
          <input
            className="w-1/2 p-2 bg-zinc-800 focus:outline-none"
            type="number"
            id="number"
            placeholder="Phone Number"
            defaultValue={currentUser.number}
          />
        </label>
        <label className="w-full flex flex-col justify-center gap-2 items-center">
          <h3>Update Your Password :- </h3>
          <input
            className="w-1/2 p-2 bg-zinc-800 focus:outline-none"
            type="password"
            id="password"
            placeholder="**************"
          />
        </label>
        {/* PROFILE BUTTONS */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handleSignOut}
            to={"/"}
            className="py-2 px-4 bg-red-600"
          >
            {loadingSignOut ? "Loading ... " : "SIGN OUT"}
          </button>
          <button onClick={handleUpdate} className="py-2 px-4 bg-red-600">
            {loading ? "Loading ... " : "UPDATE"}
          </button>
        </div>
        {currentUser.admin && (
          <Link to={"/admin"} className="py-2 px-4 bg-red-600">
            ADMIN PANEL
          </Link>
        )}
      </form>
    </div>
  );
}

export default Profile;
