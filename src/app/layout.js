import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/wallet.css";
import ContextProvider from "../lib/web3Config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wallet Transactions App",
  description: "Next.js app with MetaMask and WalletConnect integration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}