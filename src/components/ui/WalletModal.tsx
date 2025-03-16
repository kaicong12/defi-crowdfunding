import { useState } from "react"
import { useSyncProviders } from "@/hooks/useSyncProviders"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { Dialog, Portal,  VStack, Text, Button } from "@chakra-ui/react"
import { EIP6963ProviderDetail } from "@/lib/types"
import { configureWallet, configureUserAcc } from "@/lib/features/walletSlice"

const MissingWallet = () => {
    return (
        <VStack p={5} border="1px dashed #ddd" borderRadius="10px" textAlign="center">
            <Text fontSize="xl" fontWeight="bold">No Wallets Detected</Text>
            <Text fontSize="md" color="gray.500">
                Get started by installing MetaMask or another supported wallet.
            </Text>
            <Button asChild colorScheme="blue">
                <a  href="https://metamask.io/download/" target="_blank">Install MetaMask</a>
            </Button>
        </VStack>
    )
}

const ConnectYourWallet = () => {
    // render this component when there is no wallet connected 
    return (
        <VStack spacing={4} p={5} textAlign="center">
            <Text fontSize="lg" fontWeight="bold">No Wallet Connected</Text>
            <Text fontSize="md" color="gray.500">
                Connect a wallet to start using the app.
            </Text>
        </VStack>
    )
}

export const WalletModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const providers = useSyncProviders()
    const dispatch = useAppDispatch()
    const wallet = useAppSelector(state => state.wallet);
    const { wallet: selectedWallet, address: userAccount } = wallet;

    const handleAccountChange = (accounts: string[]) => {
        if (accounts.length === 0) {
            return
        }
        dispatch(configureUserAcc(accounts?.[0]));
    }

    const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
        try {
            const accounts = await providerWithInfo.provider.request({
                method: "eth_requestAccounts"
            }) as string[]
            
            providerWithInfo.provider
                    .on("accountsChanged", handleAccountChange)

            dispatch(configureWallet(providerWithInfo));
            dispatch(configureUserAcc(accounts?.[0]));

        } catch (error) {
            console.error(error)
        }
    }

    // render wallet details here
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose} placement={"center"} >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Text fontSize="lg" fontWeight="bold">Connect Wallet</Text>
                        </Dialog.Header>
                        <Dialog.Body>
                            {providers.length === 0 ? <MissingWallet /> : null}
                            {providers.length > 0 && userAccount === null && <ConnectYourWallet />}

                            {userAccount && selectedWallet && (
                                <VStack
                                    p={4}
                                    border="1px solid #ddd"
                                    borderRadius="10px"
                                    bg="gray.50"
                                    spacing={2}
                                    align="center"
                                    mt={4}
                                >
                                    <Image src={selectedWallet.info.icon} alt={selectedWallet.info.name} boxSize="40px" />
                                    <Text fontSize="lg" fontWeight="bold">{selectedWallet.info.name}</Text>
                                    <Text fontSize="md" color="gray.600">{userAccount}</Text>
                                </VStack>
                            )}
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}