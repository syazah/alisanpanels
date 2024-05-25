import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpSuccess } from "../redux/slice/user.slice";

function VerifyOtp() {
  const { signUpCred } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [enteredOtp, setEnteredOtp] = useState("");
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const finalData = { ...signUpCred, otp: enteredOtp };
      const res = await fetch("/api/v1/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        alert(data.message);
      }
      if (res.ok) {
        dispatch(signUpSuccess(data.data));
        return navigate("/signin");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-[100vh] bg-zinc-900">
      <Navbar />
      <div className="flex w-full h-full">
        <div className="w-1/2 flex flex-col h-full justify-center items-start p-8 px-10 gap-8">
          <h1 className="text-2xl font-semibold text-red-600 border-b-2 border-red-600">
            Verify Your Account{" "}
          </h1>
          <p className="text-white">
            We have sent a One Time Password to your email account kindly enter
            the OTP so that the account verification can be completed
          </p>
          <div className="w-full flex justify-start">
            <input
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              className="w-[80%] bg-zinc-950 p-2 text-white rounded-tl-2xl rounded-bl-2xl px-4"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-[20%] bg-red-600 rounded-tr-2xl rounded-br-2xl"
            >
              {loading ? "loading" : "SUBMIT"}
            </button>
          </div>
        </div>
        <div className="w-1/2 bg-red-600 flex justify-center items-center">
          <img
            className="w-[70%] shadow-2xl rounded-xl"
            alt="email verify"
            src="/mailSent.gif"
          />
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
