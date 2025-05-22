'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { BUSD_CONTRACT_ADDRESS, BUSD_ABI } from '../lib/contractUtils'
import { useState } from 'react'

export function useContract() {
    const [lastTxHash, setLastTxHash] = useState(null)

    const { writeContract, data: writeData, isPending: isWritePending, error: writeError } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: writeData || lastTxHash,
    })

    // Read allowance function
    const useAllowance = (owner, spender) => {
        return useReadContract({
            address: BUSD_CONTRACT_ADDRESS,
            abi: BUSD_ABI,
            functionName: 'allowance',
            args: [owner, spender],
            enabled: Boolean(owner && spender),
        })
    }

    // Read balance function
    const useBalance = (address) => {
        return useReadContract({
            address: BUSD_CONTRACT_ADDRESS,
            abi: BUSD_ABI,
            functionName: 'balanceOf',
            args: [address],
            enabled: Boolean(address),
        })
    }

    // Read token info
    const useTokenInfo = () => {
        const { data: name } = useReadContract({
            address: BUSD_CONTRACT_ADDRESS,
            abi: BUSD_ABI,
            functionName: 'name',
        })

        const { data: symbol } = useReadContract({
            address: BUSD_CONTRACT_ADDRESS,
            abi: BUSD_ABI,
            functionName: 'symbol',
        })

        const { data: decimals } = useReadContract({
            address: BUSD_CONTRACT_ADDRESS,
            abi: BUSD_ABI,
            functionName: 'decimals',
        })

        return { name, symbol, decimals }
    }

    // Approve function
    const approve = async (spender, amount) => {
        try {
            const result = await writeContract({
                address: BUSD_CONTRACT_ADDRESS,
                abi: BUSD_ABI,
                functionName: 'approve',
                args: [spender, parseUnits(amount.toString(), 18)], // Assuming 18 decimals
            })
            setLastTxHash(result)
            return result
        } catch (error) {
            console.error('Approve failed:', error)
            throw error
        }
    }

    // Utility function to format token amounts
    const formatTokenAmount = (amount, decimals = 18) => {
        if (!amount) return '0'
        return formatUnits(amount, decimals)
    }

    return {
        useAllowance,
        useBalance,
        useTokenInfo,
        approve,
        formatTokenAmount,
        isWritePending,
        isConfirming,
        isConfirmed,
        writeError,
        lastTxHash: writeData || lastTxHash,
    }
}