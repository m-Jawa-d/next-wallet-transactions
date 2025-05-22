'use client'

import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { bsc } from 'wagmi/chains'

export function useWallet() {
    const { open } = useWeb3Modal()
    const { address, isConnected, isConnecting } = useAccount()
    const { disconnect } = useDisconnect()
    const chainId = useChainId()
    const { switchChain } = useSwitchChain()

    const connectWallet = async () => {
        try {
            await open()
        } catch (error) {
            console.error('Failed to connect wallet:', error)
            throw error
        }
    }

    const disconnectWallet = async () => {
        try {
            await disconnect()
        } catch (error) {
            console.error('Failed to disconnect wallet:', error)
            throw error
        }
    }

    const switchToSepolia = async () => {
        if (chainId !== bsc.id) {
            try {
                await switchChain({ chainId: bsc.id })
            } catch (error) {
                console.error('Failed to switch to Sepolia:', error)
                throw error
            }
        }
    }

    const isOnSepolia = chainId === bsc.id

    return {
        address,
        isConnected,
        isConnecting,
        chainId,
        isOnSepolia,
        connectWallet,
        disconnectWallet,
        switchToSepolia,
        openModal: open
    }
}