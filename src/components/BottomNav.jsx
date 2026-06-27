import {
  Home,
  User,
  Trophy,
  ScrollText,
  Pickaxe,
  Wallet
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {

  const location = useLocation();

  const activeClass = (path) =>
    location.pathname === path
      ? "text-yellow-500"
      : "text-slate-400";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 flex justify-around py-3 z-50">

      <Link
        to="/home"
        className={activeClass("/home")}
      >
        <Home size={22} />
      </Link>

      <Link
        to="/experts"
        className={activeClass("/experts")}
      >
        <User size={22} />
      </Link>

      <Link
        to="/missions"
        className={activeClass("/missions")}
      >
        <ScrollText size={22} />
      </Link>

      <Link
    to="/wallet"
    className={activeClass("/wallet")}
  >
    <Wallet size={22}/>
  </Link>

      <Link
        to="/leaderboard"
        className={activeClass("/leaderboard")}
      >
        <Trophy size={22} />
      </Link>

      <Link
        to="/mining"
        className={activeClass("/mining")}
      >
        <Pickaxe size={22} />
      </Link>

    </div>
  );
}