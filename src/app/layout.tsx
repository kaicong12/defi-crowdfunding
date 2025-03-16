import type { Metadata } from "next";
import "./globals.css";

import { Provider } from "@/components/ui/provider";
import { SideBar } from "./Sidebar";
import { Montserrat } from "next/font/google";
import StoreProvider from "./StateProvider";

export const metadata: Metadata = {
  title: "Decentralised Crowdfunding Platform",
  description: "A platform to support and fund innovative projects using decentralized technology. The smart contracts are written in Solidity and run on the Ethereum blockchain.",
};

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html lang="en">
        <body className={`${montserrat.className}`} style={{ background: "#f2f2f2"}}>
          <StoreProvider>
            <Provider>
              <SideBar>
                {children}
              </SideBar>
            </Provider>
          </StoreProvider>
        </body>
      </html>
    
  );
}
