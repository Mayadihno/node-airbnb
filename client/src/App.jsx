import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context/UserContext";
import Profile from "./Auth/Profile/Profile";
import PlacesPage from "./Pages/PlacesPage";
import PlaceFormData from "./Components/PlaceFormData";
import Home from "./Components/Home";
import PlaceDescription from "./Components/PlaceDescription";
import BookingsPage from "./Components/BookingsPage";
import BookingPage from "./Components/BookingPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="py-4 px-8 flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlaceFormData />} />
          <Route path="/account/places/:id?" element={<PlaceFormData />} />
          <Route path="/places/:id" element={<PlaceDescription />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Routes>
        <ToastContainer position="top-right" />
      </div>
    </UserContextProvider>
  );
}

export default App;
