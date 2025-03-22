import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface WalletState {
    address: string | null;
    provider: any;
    connectedWallet: {
        name: string;
        icon: string;
    } | null;
}

const initialState: WalletState = {
    provider: null,
    address: null,
    connectedWallet: null,
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