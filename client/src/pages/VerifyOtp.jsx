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
  const [popupOpen, setPopupOpen] = useState(false);
  const email = signUpCred.email;
  const password = signUpCred.password;

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
        setLoading(false);
        alert(data.message);
      }
      if (res.ok) {
        const newData = { ...data.data, email, password };
        dispatch(signUpSuccess(newData));
        setLoading(false);
        return setPopupOpen(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log(error);
    }
  };

  //SEND MAIL
  async function handleSendEmail() {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signUpCred.email,
          password: signUpCred.password,
        }),
      });
      setLoading(false);
      if (res.ok) {
        return navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col w-full h-[100vh] bg-zinc-900">
      <Navbar />
      {popupOpen && (
        <div className="absolute p-10 w-[100%] h-[100%] top-10 left-0 bg-[rgb(255,255,255,0.5)] flex justify-center items-center">
          <div className="p-4 w-[50%] h-[40%] bg-zinc-950 border-2 border-red-600 flex flex-col rounded-lg">
            <h1 className="text-3xl text-red-600 border-b-2 border-red-600 font-bold">
              User Verified
            </h1>
            <p className="text-lg text-white py-4">
              Do you want to send a mail to the user with login credentials, The
              user will be verified even if you cancel the popup.
            </p>
            <div className="self-end my-6 flex gap-2">
              <button
                onClick={() => {
                  return navigate("/admin");
                }}
                disabled={loading}
                className="p-2 px-4 text-white rounded-xl border-2 border-red-600"
              >
                CANCEL
              </button>
              <button
                onClick={handleSendEmail}
                className="p-2 px-4 text-white bg-red-600 rounded-xl"
              >
                {loading ? "Loading..." : "SEND"}
              </button>
            </div>
          </div>
        </div>
      )}
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
