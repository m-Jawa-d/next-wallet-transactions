# Next.js Wallet Transactions App

A modern Web3 application built with Next.js that integrates MetaMask and WalletConnect for seamless wallet connections on both web and mobile. The app allows users to interact with a BUSD contract on the Sepolia testnet.

## Features

- 🔗 **Universal Wallet Support**: MetaMask, WalletConnect, and other popular wallets
- 📱 **Mobile & Web Compatible**: Works seamlessly on desktop and mobile devices
- 🔐 **Secure Transactions**: Read and write contract interactions with proper error handling
- 🌐 **Sepolia Testnet**: Configured for Sepolia testnet with automatic network switching
- 💡 **Modern UI**: Clean, responsive interface with dark mode support
- ⚡ **Real-time Updates**: Live balance and allowance updates after transactions

## Contract Functions

- **Read**: `allowance(owner, spender)` - Check token allowances
- **Write**: `approve(spender, amount)` - Approve token spending
- **Additional**: Balance checking and token information display

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Wallet Integration**: Wagmi v2 + Web3Modal v4
- **Blockchain Interaction**: Viem
- **State Management**: TanStack Query
- **Styling**: CSS with responsive design

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

1. Create a `.env.local` file in the root directory
2. Get a WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com)
3. Add your environment variables:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage Guide

### Connecting Your Wallet

1. Click "Connect Wallet" button
2. Choose from available wallet options (MetaMask, WalletConnect, etc.)
3. Approve the connection in your wallet

### Network Setup

- The app automatically detects if you're on Sepolia testnet
- If on wrong network, click "Switch to Sepolia" button
- Make sure you have Sepolia ETH for gas fees

### Contract Interactions

#### Reading Allowances
1. Enter a spender address in the "Check Allowance" section
2. View current allowance amount in real-time

#### Approving Tokens
1. Enter the spender address
2. Enter the amount to approve
3. Click "Approve" and confirm in your wallet
4. Monitor transaction status and confirmation

### Mobile Usage

- Open the app in your mobile browser
- For MetaMask mobile: Use the in-app browser
- For other wallets: Use WalletConnect QR code scanning

## Contract Details

- **Contract Address**: `0x6fEA2f1b82aFC40030520a6C49B0d3b652A65915`
- **Network**: Sepolia Testnet (Chain ID: 11155111)
- **Functions**: ERC20 allowance and approve

## Development

### Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout with Web3 provider
│   ├── page.js            # Main page component
│   └── globals.css        # Global styles
├── components/
│   └── WalletDashboard.js # Main wallet interface
├── hooks/
│   ├── useWallet.js       # Wallet connection logic
│   └── useContract.js     # Contract interaction logic
├── lib/
│   └── web3Config.js      # Web3Modal and Wagmi configuration
└── styles/
    └── wallet.css         # Component-specific styles
```

### Key Features Implementation

- **Wallet Detection**: Automatic detection of available wallets
- **Network Switching**: Programmatic network switching to Sepolia
- **Transaction Tracking**: Real-time transaction status monitoring
- **Error Handling**: Comprehensive error messages and user feedback
- **Responsive Design**: Mobile-first approach with touch-friendly interfaces

## Troubleshooting

### Common Issues

1. **Wallet Not Connecting**
   - Ensure wallet extension is installed and unlocked
   - Check if popup blockers are disabled
   - Try refreshing the page

2. **Wrong Network**
   - Click "Switch to Sepolia" button
   - Manually add Sepolia network to your wallet if needed

3. **Transaction Failing**
   - Ensure sufficient ETH for gas fees
   - Check contract address and function parameters
   - Verify network connection

### Mobile-Specific Issues

1. **MetaMask Mobile**
   - Use MetaMask's in-app browser
   - Ensure latest version of MetaMask mobile

2. **WalletConnect**
   - Scan QR code with compatible wallet
   - Ensure stable internet connection

## Security Considerations

- Never share private keys or seed phrases
- Always verify contract addresses
- Use testnet for development and testing
- Keep wallet software updated

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both web and mobile
5. Submit a pull request

## License

This project is for educational and development purposes. Please review and comply with relevant licenses for all dependencies.

## Support

For issues and questions:
- Check the troubleshooting section above
- Review [Wagmi documentation](https://wagmi.sh)
- Consult [Web3Modal documentation](https://docs.walletconnect.com/web3modal/about)