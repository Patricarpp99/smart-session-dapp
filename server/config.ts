import "dotenv/config";

export const PRIVATE_KEY = process.env.APPLICATION_PRIVATE_KEY as `0x${string}`;
export const PORT = Number(process.env.BACKEND_PORT || 8787);
export const RPC_URL = "https://mainnet.base.org";

export const REOWN_API = "https://rpc.walletconnect.com/v1";