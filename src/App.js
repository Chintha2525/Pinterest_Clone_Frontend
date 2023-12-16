import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PinCreation from "./components/PinCreateForm/PinCreation";
import CreatePin from "./components/PinCreateForm/Create";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import PageNotFound from "./components/Pnf";
import PinForm from "./pages/Creation/PinForm";
import Login from "./components/Login/LoginForm";
import Register from "./components/Register/Register";
import { AuthContext } from "./context/AuthContext";
import UAHome from "./pages/UnauthHome/UnauthHome";
import Single from "./pages/Single/Single";
import Category from "./pages/Category/Category";
import Search from "./pages/Search/Search";
import Updateuser from "./pages/Update/Updateuser";
import Saved from "./pages/SavedPins/Saved";

function App() {
  const [modalShow, setModalShow] = useState(true);
  const show = () => {
    setModalShow(true);
  };
  const hide = () => {
    setModalShow(false);
  };
  const { user } = useContext(AuthContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user != null ? <Home /> : <UAHome />} />
          <>{"          "}</>
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/pinCreation"
            element={<CreatePin show={show} onHide={hide} />}
          />
          <Route path="/pinCreationForm/:url" element={<PinCreation />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/pinform" element={<PinForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pins/:id" element={<Single />} />
          <Route path="/search/:kw" element={<Search />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/update" element={<Updateuser />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
