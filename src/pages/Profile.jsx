import { useEffect, useState } from "react";
import API from "../config/api";
import { User, Star, Coins } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const loadUser = async () => {
      try {

        const res = await API.get("/daily/userbalance");

        setUser(res.data);

      } catch (err) {
        console.log("Profile error:", err);
      }
    };

    loadUser();

  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 p-4">

      {/* HEADER */}
      <div className="p-4 text-center relative">

        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center"
        >
          <ArrowLeft />
        </button>

        <h1 className="text-white text-2xl font-bold">
          User Profile
        </h1>

      </div>

      {/* XP */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between mt-4">

        <div className="flex items-center gap-2">
          <Star className="text-yellow-500" />
          <span>XP</span>
        </div>

        <span className="text-yellow-500 font-bold">
          {user?.xp ?? 0}
        </span>

      </div>

      {/* BARIN */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between mt-4">

        <div className="flex items-center gap-2">
          <Coins className="text-green-400" />
          <span>BARIN</span>
        </div>

        <span className="text-green-400 font-bold">
          {user?.barin ?? 0}
        </span>

      </div>

      <BottomNav />

    </div>
  );
}