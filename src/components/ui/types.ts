export interface IAvailableWallet {
    name: string;
    provider?: any;
    icon: string;
}

export interface IWalletInformation {
    connectedWallet: IAvailableWallet;
    userAccount: string;
    disconnectWallet: () => void;
}

export interface IConnectWallet {
    availableWallets: IAvailableWallet[];
    handleConnect: (name: string, icon: string, selectedProvider: any) => void;
}