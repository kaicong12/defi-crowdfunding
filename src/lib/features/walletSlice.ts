import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EIP6963ProviderDetail } from '../types'

export interface WalletState {
    wallet: EIP6963ProviderDetail | null;
    address: string | null;
}

const initialState: WalletState = {
    wallet: null,
    address: null
}

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        configureWallet: (state, action: PayloadAction<EIP6963ProviderDetail>) => {
            state.wallet = action.payload;
        },
        configureUserAcc: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        }
    }
})

export const { configureWallet, configureUserAcc } = walletSlice.actions;
export default walletSlice.reducer