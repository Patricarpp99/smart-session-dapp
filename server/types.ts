export type PrepareCallsParams = [
  {
    from: `0x${string}`;
    chainId: `0x${string}`;
    calls: {
      to: `0x${string}`;
      data: `0x${string}`;
      value: `0x${string}`;
    }[];
    capabilities: Record<string, any>;
  }
];

export type PreparedCallResult = {
  preparedCalls: any;
  signatureRequest: { hash: `0x${string}` };
  context: `0x${string}`;
};

export type SendPreparedParams = {
  context: `0x${string}`;
  preparedCalls: any;
  signature: `0x${string}`;
};

export type CallsStatusResult = {
  status: "PENDING" | "CONFIRMED" | "FAILED";
  transactionHash?: string;
};