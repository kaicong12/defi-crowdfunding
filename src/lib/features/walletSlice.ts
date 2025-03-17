import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EIP6963ProviderInfo, EIP1193Provider, EIP6963ProviderDetail } from '../types'

export interface WalletState {
    walletInfo: EIP6963ProviderInfo | null;
    address: string | null;
    provider: EIP1193Provider | null;
}

const initialState: WalletState = {
    provider: null,
    walletInfo: null,
    address: null
}

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        configureWallet: (state, action: PayloadAction<EIP6963ProviderDetail | null>) => {
            if (!action.payload) {
                state.walletInfo = null;
                state.provider = null;
                return;
            }

            const { info, provider } = action.payload
            state.walletInfo = info;
            state.provider = provider;
        },
        configureUserAcc: (state, action: PayloadAction<string | null>) => {
            state.address = action.payload;
        }
    }
})

export const { configureWallet, configureUserAcc } = walletSlice.actions;
export default walletSlice.reducer