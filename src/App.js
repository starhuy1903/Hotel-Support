import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*  public routes*/}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/*  protected routes*/}
        <Route element={<RequireAuth />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
