import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import Home from "./pages/Home";
import HotelList from "./pages/HotelList";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*  public routes*/}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="hotels" element={<HotelList />} />

        {/*  protected routes*/}
        <Route element={<RequireAuth />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
