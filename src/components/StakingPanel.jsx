import { useState } from "react";
import { useStakingStore } from "../store/stakingStore";
import useBarinToken from "../hooks/useBarinToken";

export default function StakingPanel() {

  const { formatted } = useBarinToken();

  const {
    stakedAmount,
    isStaked,
    multiplier,
    stake,
    unstake,
  } = useStakingStore();

  const [amount, setAmount] = useState("");

  return (
    <div className="bg-slate-900 p-4 rounded-2xl mt-4">

      <h2 className="text-yellow-400 font-bold mb-3">
        BARIN Staking
      </h2>

      <div className="text-sm text-slate-400">
        Wallet Balance: {formatted}
      </div>

      {!isStaked ? (
        <>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter BARIN to stake"
            className="w-full mt-3 p-2 bg-slate-800 text-white rounded-lg"
          />

          <button
            onClick={() => stake(Number(amount))}
            className="w-full mt-3 bg-yellow-500 text-black font-bold py-2 rounded-lg"
          >
            Stake BARIN
          </button>
        </>
      ) : (
        <div className="mt-3">

          <div className="text-green-400 font-bold">
            Staked: {stakedAmount} BARIN
          </div>

          <div className="text-cyan-300">
            Multiplier: x{multiplier}
          </div>

          <button
            onClick={unstake}
            className="w-full mt-3 bg-red-500 text-white font-bold py-2 rounded-lg"
          >
            Unstake
          </button>

        </div>
      )}

    </div>
  );
}