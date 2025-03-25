import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import deployedContract from "@/CrowdFunding.json"

export interface WalletState {
    address: string | null;
    provider: any;
    connectedWallet: {
        name: string;
        icon: string;
    } | null;
    deployedAddress: string;
    contractABI: any;
    contract: any;
}

const initialState: WalletState = {
    provider: null,
    address: null,
    connectedWallet: null,
    deployedAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    contractABI: deployedContract.abi,
    contract: null,
}

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        configureWallet: (state, action: PayloadAction<any | null>) => {
            if (!action.payload) {
                state.provider = null;
                state.address = null;
                state.connectedWallet = null;
                return;
            }   

            const { connectedWallet, provider } = action.payload
            state.provider = provider;
            state.connectedWallet = connectedWallet;
        },
        configureUserAcc: (state, action: PayloadAction<string | null>) => {
            state.address = action.payload;
        }
    }
})

export const { configureWallet, configureUserAcc } = walletSlice.actions;
export default walletSlice.reducer