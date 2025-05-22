'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '../hooks/useWallet'
import { useContract } from '../hooks/useContract'

export default function WalletDashboard() {
    const {
        address,
        isConnected,
        isConnecting,
        isOnSepolia,
        connectWallet,
        disconnectWallet,
        switchToSepolia
    } = useWallet()

    const {
        useAllowance,
        useBalance,
        useTokenInfo,
        approve,
        formatTokenAmount,
        isWritePending,
        isConfirming,
        isConfirmed,
        writeError,
        lastTxHash
    } = useContract()

    const [spenderAddress, setSpenderAddress] = useState('')
    const [approveAmount, setApproveAmount] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Get token info
    const { name, symbol, decimals } = useTokenInfo()

    // Get user balance
    const { data: balance, refetch: refetchBalance } = useBalance(address)

    // Get allowance (using spender address if provided)
    const { data: allowance, refetch: refetchAllowance } = useAllowance(
        address,
        spenderAddress || '0x0000000000000000000000000000000000000000'
    )

    // Handle transaction confirmation
    useEffect(() => {
        if (isConfirmed && lastTxHash) {
            setSuccess(`Transaction confirmed! Hash: ${lastTxHash}`)
            setError('')
            // Refetch data after successful transaction
            refetchBalance()
            refetchAllowance()
        }
    }, [isConfirmed, lastTxHash, refetchBalance, refetchAllowance])

    // Handle write errors
    useEffect(() => {
        if (writeError) {
            setError(`Transaction failed: ${writeError.message}`)
            setSuccess('')
        }
    }, [writeError])

    const handleApprove = async () => {
        if (!spenderAddress || !approveAmount) {
            setError('Please enter both spender address and amount')
            return
        }

        if (!isOnSepolia) {
            setError('Please switch to Sepolia network')
            return
        }

        try {
            setError('')
            setSuccess('')
            await approve(spenderAddress, approveAmount)
        } catch (err) {
            setError(`Approval failed: ${err.message}`)
        }
    }

    const shortenAddress = (addr) => {
        if (!addr) return ''
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    if (!isConnected) {
        return (
            <div className="wallet-container">
                <div className="wallet-card">
                    <h2>Connect Your Wallet</h2>
                    <p>Connect your wallet to interact with BUSD contract on Sepolia</p>
                    <button
                        onClick={connectWallet}
                        disabled={isConnecting}
                        className="connect-button"
                    >
                        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="wallet-container">
            <div className="wallet-card">
                <div className="wallet-header">
                    <h2>Wallet Dashboard</h2>
                    <div className="wallet-info">
                        <p><strong>Address:</strong> {shortenAddress(address)}</p>
                        <p><strong>Network:</strong> {isOnSepolia ? 'Sepolia ✅' : 'Wrong Network ❌'}</p>
                        <button onClick={disconnectWallet} className="disconnect-button">
                            Disconnect
                        </button>
                    </div>
                </div>

                {!isOnSepolia && (
                    <div className="network-warning">
                        <p>⚠️ Please switch to Sepolia network</p>
                        <button onClick={switchToSepolia} className="switch-button">
                            Switch to Sepolia
                        </button>
                    </div>
                )}

                <div className="token-info">
                    <h3>Token Information</h3>
                    <p><strong>Name:</strong> {name || 'Loading...'}</p>
                    <p><strong>Symbol:</strong> {symbol || 'Loading...'}</p>
                    <p><strong>Decimals:</strong> {decimals || 'Loading...'}</p>
                    <p><strong>Your Balance:</strong> {balance ? formatTokenAmount(balance, decimals) : 'Loading...'} {symbol}</p>
                </div>

                <div className="allowance-section">
                    <h3>Check Allowance</h3>
                    <div className="input-group">
                        <label>Spender Address:</label>
                        <input
                            type="text"
                            value={spenderAddress}
                            onChange={(e) => setSpenderAddress(e.target.value)}
                            placeholder="0x..."
                            className="address-input"
                        />
                    </div>
                    {spenderAddress && allowance !== undefined && (
                        <p><strong>Current Allowance:</strong> {formatTokenAmount(allowance, decimals)} {symbol}</p>
                    )}
                </div>

                <div className="approve-section">
                    <h3>Approve Tokens</h3>
                    <div className="input-group">
                        <label>Amount to Approve:</label>
                        <input
                            type="number"
                            value={approveAmount}
                            onChange={(e) => setApproveAmount(e.target.value)}
                            placeholder="0.0"
                            className="amount-input"
                            min="0"
                            step="0.000001"
                        />
                    </div>
                    <button
                        onClick={handleApprove}
                        disabled={isWritePending || isConfirming || !isOnSepolia}
                        className="approve-button"
                    >
                        {isWritePending
                            ? 'Confirming...'
                            : isConfirming
                                ? 'Processing...'
                                : 'Approve'}
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}

                {lastTxHash && (
                    <div className="transaction-info">
                        <p><strong>Last Transaction:</strong></p>
                        <a
                            href={`https://bsc.etherscan.io/tx/${lastTxHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tx-link"
                        >
                            View on Etherscan
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}