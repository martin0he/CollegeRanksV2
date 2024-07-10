import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import ReviewPage from "./pages/ReviewPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/colleges" element={<DashboardPage />} />
        <Route path="/colleges/:id" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
