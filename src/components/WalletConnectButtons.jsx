import { FaWallet } from "react-icons/fa";
import { SiMetamask, SiCoinbase } from "react-icons/si";
import { RiWallet3Fill } from "react-icons/ri";

export default function WalletConnectButtons({
  connectMetaMask,
  connectCoinbase,
  connectWalletConnect,
}) {
  return (
    <div className="space-y-3">

      {/* TITLE */}
      <div className="text-slate-400 text-sm mb-2">
        Connect your wallet
      </div>

      {/* META MASK */}
      <button
        onClick={connectMetaMask}
        className="w-full flex items-center gap-3 bg-slate-900 border border-slate-800 hover:border-yellow-500 transition rounded-xl px-4 py-3"
      >
        <SiMetamask size={22} className="text-orange-400" />
        <span className="font-bold">MetaMask</span>
      </button>

      {/* COINBASE */}
      <button
        onClick={connectCoinbase}
        className="w-full flex items-center gap-3 bg-slate-900 border border-slate-800 hover:border-blue-500 transition rounded-xl px-4 py-3"
      >
        <SiCoinbase size={22} className="text-blue-400" />
        <span className="font-bold">Coinbase Wallet</span>
      </button>

      {/* WALLETCONNECT */}
      <button
        onClick={connectWalletConnect}
        className="w-full flex items-center gap-3 bg-slate-900 border border-slate-800 hover:border-purple-500 transition rounded-xl px-4 py-3"
      >
        <RiWallet3Fill size={22} className="text-purple-400" />
        <span className="font-bold">WalletConnect</span>
      </button>

    </div>
  );
}