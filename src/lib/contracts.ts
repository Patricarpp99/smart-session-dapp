export const SMART_SESSION_TARGET_ADDRESS =
  import.meta.env.VITE_SMART_SESSION_TARGET_ADDRESS as `0x${string}`;

export const SMART_SESSION_TARGET_ABI = [
  {
    type: "function",
    name: "store",
    stateMutability: "nonpayable",
    inputs: [{ name: "newNumber", type: "uint256" }],
    outputs: []
  },
 

  {
    type: "function",
    name: "get",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }]
  }
] as const;

export const CONTRACT = {
  address: SMART_SESSION_TARGET_ADDRESS,
  abi: SMART_SESSION_TARGET_ABI,
};