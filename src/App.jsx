import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import Home from "./pages/Home";
import HotelDetail from "./pages/HotelDetail";
import HotelList from "./pages/HotelList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*  public routes*/}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="hotels" element={<HotelList />} />
        <Route path="hotels/:hotelId" element={<HotelDetail />} />

        {/*  protected routes*/}
        <Route element={<RequireAuth />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
