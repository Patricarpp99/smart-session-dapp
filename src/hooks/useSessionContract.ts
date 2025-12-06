import { useState, useCallback } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useChainId, useAccount } from 'wagmi';
import {
    SMART_SESSION_ABI,
    getContractAddressByChainId,
    getChainMetadata,
    encodeSessionData,
    encodeRevocationData
} from '../lib/contracts';

export interface SessionData {
    targetAddress: string;
    targetName: string;
    permissions: string[];
    expiry: string;
}

export interface TransactionResult {
    hash: `0x${string}`;
    explorerUrl: string;
}

export function useSessionContract() {
    const chainId = useChainId();
    const { address } = useAccount();
    const [isCreating, setIsCreating] = useState(false);
    const [isRevoking, setIsRevoking] = useState(false);
    const [lastTxHash, setLastTxHash] = useState<`0x${string}` | null>(null);

    const { writeContractAsync } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: lastTxHash || undefined,
    });

    const contractAddress = getContractAddressByChainId(chainId);
    const chainMetadata = getChainMetadata(chainId);

    // Create session on-chain
    const createSession = useCallback(async (sessionData: SessionData): Promise<TransactionResult> => {
        if (!contractAddress || !address) {
            throw new Error('Wallet not connected or unsupported chain');
        }

        setIsCreating(true);
        try {
            // Calculate expiry timestamp
            const getExpiryMs = (expiry: string): number => {
                switch (expiry) {
                    case '1h': return 60 * 60 * 1000;
                    case '1d': return 24 * 60 * 60 * 1000;
                    case '1w': return 7 * 24 * 60 * 60 * 1000;
                    case '1m': return 30 * 24 * 60 * 60 * 1000;
                    default: return 60 * 60 * 1000;
                }
            };

            const expiryTimestamp = Math.floor((Date.now() + getExpiryMs(sessionData.expiry)) / 1000);

            // Encode session data as uint256
            const encodedData = encodeSessionData(
                sessionData.targetAddress,
                sessionData.permissions,
                expiryTimestamp
            );

            // Write to contract
            const hash = await writeContractAsync({
                address: contractAddress,
                abi: SMART_SESSION_ABI,
                functionName: 'store',
                args: [encodedData],
            });

            setLastTxHash(hash);

            return {
                hash,
                explorerUrl: `${chainMetadata?.txExplorer || 'https://basescan.org/tx/'}${hash}`,
            };
        } finally {
            setIsCreating(false);
        }
    }, [contractAddress, address, chainMetadata, writeContractAsync]);

    // Revoke session on-chain
    const revokeSession = useCallback(async (sessionId: string): Promise<TransactionResult> => {
        if (!contractAddress || !address) {
            throw new Error('Wallet not connected or unsupported chain');
        }

        setIsRevoking(true);
        try {
            // Encode revocation data
            const encodedData = encodeRevocationData(sessionId);

            // Write revocation to contract
            const hash = await writeContractAsync({
                address: contractAddress,
                abi: SMART_SESSION_ABI,
                functionName: 'store',
                args: [encodedData],
            });

            setLastTxHash(hash);

            return {
                hash,
                explorerUrl: `${chainMetadata?.txExplorer || 'https://basescan.org/tx/'}${hash}`,
            };
        } finally {
            setIsRevoking(false);
        }
    }, [contractAddress, address, chainMetadata, writeContractAsync]);

    return {
        createSession,
        revokeSession,
        isCreating,
        isRevoking,
        isConfirming,
        isConfirmed,
        lastTxHash,
        contractAddress,
        chainMetadata,
    };
}
