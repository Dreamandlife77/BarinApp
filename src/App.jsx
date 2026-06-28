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
import Profile from "./pages/Profile";
import { useEffect, useRef, useCallback } from "react";
import { useAccount, useReconnect } from "wagmi";

function App() {

    const { isConnected } = useAccount();
    const { reconnect } = useReconnect();
    const timersRef = useRef([]);

    // Retry reconnect with delays to handle WebSocket timing
    const attemptReconnect = useCallback(() => {
        if (isConnected) return;

        // Clear any pending retries
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];

        // Try reconnect at staggered intervals: now, 500ms, 1.5s, 3s
        const delays = [0, 500, 1500, 3000];
        delays.forEach((delay) => {
            const timer = setTimeout(() => {
                reconnect();
            }, delay);
            timersRef.current.push(timer);
        });
    }, [isConnected, reconnect]);

    // Listen for visibilitychange + focus + Telegram resume
    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === "visible") {
                attemptReconnect();
            }
        };

        const handleFocus = () => {
            attemptReconnect();
        };

        document.addEventListener("visibilitychange", handleVisibility);
        window.addEventListener("focus", handleFocus);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
            window.removeEventListener("focus", handleFocus);
            timersRef.current.forEach(clearTimeout);
        };
    }, [attemptReconnect]);

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/wallet" element={<WalletPage />}

/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;