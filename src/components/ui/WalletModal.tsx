import { useSyncProviders } from "@/hooks/useSyncProviders"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { Dialog, Portal, VStack, Text, Button, Flex } from "@chakra-ui/react"
import { EIP6963ProviderDetail, EIP1193Provider } from "@/lib/types"
import { IWalletInformation } from "../types"
import { configureWallet, configureUserAcc } from "@/lib/features/walletSlice"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

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

const ConnectYourWallet = ({ providers, handleConnect }: { providers: EIP6963ProviderDetail[], handleConnect: (provider: EIP6963ProviderDetail) => void }) => {
    // render this component when there is no wallet connected 
    return (
        <VStack minH="300px" p={5} textAlign="center" justifyContent="center">
            <Text fontSize="lg" fontWeight="bold">No Wallet Connected</Text>
            <Text fontSize="md" color="gray.500" mb="12px">
                Connect a wallet to start using the app.
            </Text>
            {providers.map(provider => {
                return (
                    <Button 
                        key={provider.info.uuid} 
                        onClick={() => handleConnect(provider)} variant="outline"
                        padding="30px 24px"
                        width="60%"
                        mt="12px"
                        bg="#383838"
                        borderRadius="12px"
                        _hover={{ backgroundColor: "#404040" }}
                    >
                        <Flex width="100%" alignItems="center" gap="12px" justifyContent="space-between">
                            <Text fontWeight="bold">{provider.info.name}</Text>
                            <img height="30px" width="30px" src={provider.info.icon} alt={provider.info.name} />
                        </Flex>
                    </Button>
                )
            })}
        </VStack>
    )
}

const WalletInformation = ({currentProvider, walletInfo, userAccount, disconnectWallet }: IWalletInformation) => {
    // use this component to disconnect wallet
    return (
        <VStack minH="300px" p={5} textAlign="center" justifyContent="center">
            <img height="50px" width="50px" src={walletInfo.icon} alt={walletInfo.name} />
            <Text fontSize="lg" fontWeight="bold" mt="30px">Connected Wallet</Text>
            <Text mt="12px" fontSize="md" color="gray.500" mb="12px">
                {userAccount}
            </Text>
            <Button 
                variant="outline"
                padding="30px 24px"
                width="60%"
                mt="12px"
                bg="#383838"
                borderRadius="12px"
                _hover={{ backgroundColor: "#404040" }}
                onClick={(e) => { disconnectWallet(currentProvider)}}
            >
                <FontAwesomeIcon style={{ fontSize: "36px" }} icon={faRightFromBracket} />
                <Text fontWeight="bold">Disconnect Wallet</Text>
            </Button>
        </VStack>
    )
}

export const WalletModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const providers = useSyncProviders()
    const dispatch = useAppDispatch()
    const wallet = useAppSelector(state => state.wallet);
    const { provider: currentProvider, walletInfo, address: userAccount } = wallet;
    
    const handleAccountChange = (accounts: string[]) => {
        if (accounts.length === 0) {
            return
        }
        dispatch(configureUserAcc(accounts?.[0]));
    }

    const disconnectWallet = async (currentProvider: EIP1193Provider | null) => {
        if (!currentProvider) {
            return;
        }
        const res = await currentProvider.request({ method: "wallet_revokePermissions", params: [{ eth_accounts: {} }]})
        dispatch(configureWallet(null));
        dispatch(configureUserAcc(null));
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
            onClose()

        } catch (error) {
            console.error(error)
        }
    }

    const hasConnectedWallet = !!(walletInfo && userAccount)

    // render wallet details here
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose} placement={"center"} >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content bg="#2B2B2B" borderRadius="20px">
                        <Dialog.Body>
                            <Dialog.CloseTrigger />
                            {providers.length === 0 ? <MissingWallet /> : null}
                            {hasConnectedWallet ? (
                                <WalletInformation 
                                    currentProvider={currentProvider}
                                    walletInfo={walletInfo} 
                                    userAccount={userAccount} 
                                    disconnectWallet={disconnectWallet} 
                                />
                            ) : <ConnectYourWallet providers={providers} handleConnect={handleConnect} />}
                            
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}