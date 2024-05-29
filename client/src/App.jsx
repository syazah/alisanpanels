import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import PrivateLink from "./components/PrivateLink";
import MyCollections from "./pages/MyCollections";
import { useSelector } from "react-redux";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import VerifyOtp from "./pages/VerifyOtp";
function App() {
  const { currentUser, signUpCred } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={signUpCred?.status === 0 ? <VerifyOtp /> : <MainPage />}
        />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/signup"
          element={currentUser?.admin === true ? <SignUp /> : <NotFound />}
        />
        <Route path="/verify-user-email" element={<VerifyOtp />} />
        <Route element={<PrivateLink />}>
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/admin"
            element={currentUser?.admin === true ? <Admin /> : <PrivateLink />}
          />
          <Route path="/collections" element={<MyCollections />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
