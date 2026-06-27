import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Missions from "./pages/Missions";
import Mining from "./pages/Mining";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";

import { initTelegram } from "./services/telegram";

 function App() {
//   useEffect(() => {
//     initTelegram();
//   }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/characters" element={<Characters />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/mining" element={<Mining />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;