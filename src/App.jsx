import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import NoAuth from "./components/NoAuth";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import HotelDetail from "./pages/HotelDetail";
import HotelList from "./pages/HotelList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import RoomList from "./pages/RoomList";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* auth routes */}
        <Route element={<NoAuth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/*  public routes*/}
        <Route index element={<Home />} />

        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="hotels" element={<HotelList />} />
        <Route path="hotels/:hotelId" element={<HotelDetail />} />
        <Route path="hotels/:hotelId/rooms" element={<RoomList />} />
        {/*  protected routes*/}
        <Route element={<RequireAuth />}>
          <Route path="/me" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;