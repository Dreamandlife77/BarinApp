import { useAccount, useReadContract } from "wagmi";

const BARIN_CONTRACT = "0xYOUR_BARIN_CONTRACT_ADDRESS";

const ABI = [
  {
    "constant": true,
    "inputs": [
      { "name": "_owner", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [
      { "name": "balance", "type": "uint256" }
    ],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      { "name": "", "type": "uint8" }
    ],
    "type": "function"
  }
];

export default function useBarinToken() {

  const { address } = useAccount();

  const { data: balance } = useReadContract({
    address: BARIN_CONTRACT,
    abi: ABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  const { data: decimals } = useReadContract({
    address: BARIN_CONTRACT,
    abi: ABI,
    functionName: "decimals",
  });

  const formattedBalance =
    balance && decimals
      ? Number(balance) / Math.pow(10, decimals)
      : 0;

  return {
    raw: balance,
    formatted: formattedBalance,
  };
}