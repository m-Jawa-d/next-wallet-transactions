'use client'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID'

// 2. Create wagmiConfig
const metadata = {
    name: 'Next Wallet Transactions',
    description: 'Web3 app with MetaMask and WalletConnect',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [sepolia]
const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    enableWalletConnect: true,
    enableInjected: true,
    enableEIP6963: true,
    enableCoinbase: true,
})

// 3. Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
    enableOnramp: true,
    themeMode: 'light',
    themeVariables: {
        '--w3m-color-mix': '#00DCFF',
        '--w3m-color-mix-strength': 20
    }
})

function ContextProvider({ children }) {
    const queryClient = new QueryClient()

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default ContextProvider