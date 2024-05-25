import { useEffect, useState } from "react";
import { logo } from "../Logo";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpSuccess } from "../redux/slice/user.slice";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //SETTING TITLE
  useEffect(() => {
    document.title = "SignUp | Panels";
  });
  //SETTING FORM DATA
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
  //SETTING SUBMIT EVENT
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      if (formData.number.length !== 10) {
        setLoading(false);
        return alert("Enter Correct Number");
      }
      const res = await fetch("/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        alert(data.message);
      }
      if (res.ok) {
        dispatch(signUpSuccess(data.data));
        return navigate("/verify-user-email");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
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
          <h2 className="text-xl">Your Name</h2>
          <input
            onChange={handleChange}
            id="name"
            type="text"
            className="w-full p-2 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:p-[0.75rem]"
            placeholder="John Doe"
          />
        </label>
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
          <h2 className="text-xl">Phone Number</h2>
          <input
            onChange={handleChange}
            id="number"
            type="number"
            className="w-full p-2 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:p-[0.75rem]"
            placeholder="+91"
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
          {loading ? "Loading ... " : "SIGN UP"}
        </button>
        <h3>
          Already Have An Account ?{" "}
          <Link to={"/signin"} className="text-red-500 underline text-md">
            SIGN IN
          </Link>
        </h3>
      </form>
    </div>
  );
}

export default SignUp;
