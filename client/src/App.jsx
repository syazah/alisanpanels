import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateLink from "./components/PrivateLink";
import MyCollections from "./pages/MyCollections";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateLink />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/collections" element={<MyCollections />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
