import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logo } from "../Logo";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/slice/user.slice";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signUpCred } = useSelector((state) => state.user);
  useEffect(() => {
    document.title = "SignIn | Panels";
  });
  //SETTING FORM DATA
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
  //SETTING SUBMIT EVENT
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("All Fields Are Required"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/v1/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        if (signUpCred.status === 0) {
          return navigate("/verify-user-email");
        }
        return navigate("/");
      }
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  }
  return (
    <div className="w-full h-screen bg-zinc-700 flex">
      <div className="w-[50%] p-10 gap-8 flex flex-col justify-center items-center">
        <img className="w-52" src={logo} />
        <h3 className="text-gray-50 text-center">
          In the digital age, signing in to various platforms has become a
          common practice. Whether its social media, online shopping, or
          educational platforms, creating an account and signing in opens doors
          to a plethora of benefits. Heres why you should embrace the sign-in
          culture:
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-[50%] p-10 gap-4 flex flex-col justify-center items-center text-gray-50"
      >
        <label className="flex flex-col gap-2 w-full">
          <h2 className="text-xl">Your Email</h2>
          <input
            onChange={handleChange}
            id="email"
            type="email"
            className="w-full p-2 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:p-[0.75rem]"
            placeholder="name@company.com"
          />
        </label>

        <label className="flex flex-col gap-2 w-full">
          <h2 className="text-xl">Password</h2>
          <input
            onChange={handleChange}
            id="password"
            type="password"
            className="w-full p-2 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:p-[0.75rem]"
            placeholder="********"
          />
        </label>

        <button className="bg-red-500 p-2 text-xl w-full">
          {loading ? "Loading..." : "SIGN IN"}
        </button>
        <h3>
          Dont Have An Account ?{" "}
          <Link to={"/signup"} className="text-red-500 underline text-md">
            SIGN UP
          </Link>
        </h3>

        {errorMessage && (
          <div className="flex w-full p-4 bg-red-400 bg-opacity-[0.2] gap-4 justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="rgb(254,226,226)"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>

            <p className="text-md text-red-100">{errorMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default SignIn;
