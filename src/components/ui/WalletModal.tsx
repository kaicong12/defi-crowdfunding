"use client";

import Image from 'next/image'
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { Dialog, Portal, VStack, Text, Button, Flex } from "@chakra-ui/react"
import { IWalletInformation, IConnectWallet } from "./types"
import { configureWallet, configureUserAcc } from "@/lib/features/walletSlice"
import { ethers } from "ethers"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useMemo, useCallback } from "react";

const MissingWallet = () => {
    return (
        <VStack minH="300px" alignItems="center" justifyContent="center" p={5} borderRadius="10px" textAlign="center">
            <Text fontSize="xl" color="white" fontWeight="bold">No Wallets Detected</Text>
            <Text fontSize="md" color="gray.500" width="80%" mt="12px">
                Get started by installing MetaMask or another supported wallet.
            </Text>
            <Button 
                asChild
                padding="30px 24px"
                width="60%"
                mt="24px"
                bg="#383838"
                borderRadius="12px"
                color="white"
                _hover={{ backgroundColor: "#404040" }}
            >
                <a  href="https://metamask.io/download/" target="_blank">Install MetaMask</a>
            </Button>
        </VStack>
    )
}

const ConnectYourWallet = ({ availableWallets, handleConnect }: IConnectWallet) => {
    // render this component when there is no wallet connected 
    return (
        <VStack minH="300px" p={5} textAlign="center" justifyContent="center">
            <Text fontSize="lg" fontWeight="bold">No Wallet Connected</Text>
            <Text fontWeight="semibold" fontSize="md" color="gray.500" mb="12px">
                Connect a wallet to start using the app.
            </Text>
            {availableWallets.map(wallet => {
                return (
                    <Button 
                        key={`wallet-${wallet.name}`} 
                        onClick={() => handleConnect(wallet.name, wallet.icon, wallet.provider)} variant="outline"
                        padding="30px 24px"
                        width="60%"
                        mt="12px"
                        bg="#383838"
                        borderRadius="12px"
                        _hover={{ backgroundColor: "#404040" }}
                    >
                        <Flex width="100%" alignItems="center" gap="12px" justifyContent="space-between">
                            <Text fontWeight="bold">{wallet.name}</Text>
                            <Image height="30" width="30" src={wallet.icon} alt={wallet.name} />
                        </Flex>
                    </Button>
                )
            })}
        </VStack>
    )
}

const WalletInformation = ({ connectedWallet, userAccount, disconnectWallet }: IWalletInformation) => {
    // use this component to disconnect wallet
    return (
        <VStack minH="300px" p={5} textAlign="center" justifyContent="center">
            <Image height="50" width="50" src={connectedWallet.icon} alt={connectedWallet.name} />
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
                onClick={disconnectWallet}
            >
                <FontAwesomeIcon style={{ fontSize: "36px" }} icon={faRightFromBracket} />
                <Text fontWeight="bold">Disconnect Wallet</Text>
            </Button>
        </VStack>
    )
}

export const WalletModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const dispatch = useAppDispatch()
    const wallet = useAppSelector(state => state.wallet);
    const { connectedWallet, address: userAccount } = wallet;
    const hasConnectedWallet = !!(connectedWallet && userAccount)

    const availableWallets = useMemo(() => {
        if (window?.ethereum) {
            const providers = window?.ethereum.providers || [];
            const detectedWallets = providers.map((p: any) => {
                if (p.isMetaMask) {
                    return { name: "MetaMask", provider: p, icon: "metamask.svg" };
                } else if (p.isCoinbaseWallet) {
                    return { name: "Coinbase Wallet", provider: p, icon: "coinbase.svg" };
                }
                // Add more wallets as needed
                return null;
            }).filter((wallet: any) => wallet !== null);

            return detectedWallets;
        }

        return [];
    }, []);

    const disconnectWallet = useCallback(async () => {
        dispatch(configureUserAcc(''));
        dispatch(configureWallet(null));
    }, [dispatch]);

    const handleConnect = useCallback(async (name: string, icon: string, selectedProvider: any) => {
        try {
            await selectedProvider.request({ method: 'eth_requestAccounts' });
            selectedProvider.on('accountsChanged', (accounts: string[]) => {
                const currentAccount = accounts[0];
                dispatch(configureUserAcc(currentAccount));
            });
            
            const newProvider = new ethers.BrowserProvider(selectedProvider);
            const signer = await newProvider.getSigner();
            const address = await signer.getAddress();
            dispatch(configureWallet({ connectedWallet: { name, icon }, provider: newProvider }));
            dispatch(configureUserAcc(address));
            onClose()
        } catch (error) {
            console.error("Connection failed:", error);
        }
    }, [dispatch, onClose]);


    const DialogBody = useMemo(() => {
        if (!availableWallets.length) {
            return <MissingWallet />
        } else if (hasConnectedWallet) {
            return <WalletInformation 
                connectedWallet={connectedWallet} 
                userAccount={userAccount} 
                disconnectWallet={disconnectWallet} 
            />
        }
        return <ConnectYourWallet availableWallets={availableWallets} handleConnect={handleConnect} />
    }, [availableWallets, hasConnectedWallet, handleConnect, connectedWallet, userAccount, disconnectWallet])

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose} placement={"center"} >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content bg="#2B2B2B" borderRadius="20px">
                        <Dialog.Body>
                            <Dialog.CloseTrigger />
                                {DialogBody}
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
