import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import SelectRole from "./pages/SelectRole";
import { useAppData } from "./context/AppContext";
import SellerDashboard from "./pages/SellerDashboard";
import Navbar from "./components/Navbar";

const App = () => {
  const { user, loading } = useAppData();
  return (
    <>
      <Toaster />
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500 text-2xl font-bold">Loading...</p>
        </div>
      ) : user?.role === "seller" ? (
        <SellerDashboard />
      ) : (
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/select-role" element={<SelectRole />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
