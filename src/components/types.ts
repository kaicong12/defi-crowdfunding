import { EIP6963ProviderDetail, EIP6963ProviderInfo, EIP1193Provider } from "@/lib/types"


export interface IWalletInformation { 
    currentProvider: EIP1193Provider | null,
    walletInfo: EIP6963ProviderInfo, 
    userAccount: string, 
    disconnectWallet: (providerWithInfo: EIP1193Provider | null) => void 
}