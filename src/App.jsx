import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Experts from "./pages/Experts";
import ExpertsDetail from "./pages/ExpertsDetail.jsx";
import Missions from "./pages/Missions";
import Leaderboard from "./pages/Leaderboard";
import MineralCollection from "./pages/MineralCollection";
import Mining from "./pages/Mining";
import Register from "./auth/Register";
import Login from "./auth/Login";
import EducationDetail from "./pages/EducationDetail";
import Home from "./pages/Home.jsx"
import WalletPage from "./pages/Wallet";
import { useEffect, useState } from "react";

function App() {

  useEffect(() => {
  try {
    // Clear ALL wallet sessions
    localStorage.removeItem("walletconnect");
    localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    sessionStorage.clear();
  } catch (e) {
    console.log("Wallet reset skipped");
  }
}, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/tutorial" element={<Onboarding />} />
        <Route path="/experts"  element={<Experts />} />
        <Route path="/experts/:id" element={<ExpertsDetail />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/minerals" element={<MineralCollection />} />
        <Route path="/mining"  element={<Mining />} />
        <Route path="/education/:id"  element={<EducationDetail />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/wallet" element={<WalletPage />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;