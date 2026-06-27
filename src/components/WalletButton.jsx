import { useConnect, useAccount, useDisconnect } from "wagmi";

export default function WalletButton() {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-xs text-green-400">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>

        <button
          onClick={() => disconnect()}
          className="text-red-400 text-xs"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-xs font-bold"
        >
          Connect {connector.name}
        </button>
      ))}
    </div>
  );
}