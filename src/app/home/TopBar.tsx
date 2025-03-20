"use client";

import { 
    Box, 
    Flex, 
    Input, 
    Button, 
    Text
} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from "@/lib/hooks"
import Image from 'next/image'

interface ITopBarProps {
    onOpenWalletModal: () => void;
    onOpenCreateModal: () => void;
    setSearchTerm: (term: string) => void;
}

export const TopBar = ({ 
    onOpenWalletModal,
    onOpenCreateModal,
    setSearchTerm 
}: ITopBarProps) => {
    const wallet = useAppSelector(state => state.wallet);
    const { walletInfo, address: userAccount } = wallet;
    const hasWalletConnected = !!(walletInfo && userAccount)

    return (
        <Flex mb="30px" color="black" justifyContent="space-between" alignItems="center">
            <Box flex="1" fontSize="24px" fontWeight="bold">All Campaigns</Box>
            <Flex flex="2" gap="12px" justifyContent="flex-end">
                <Box width="60%" position="relative">
                    <Input p="4px 8px 4px 40px" placeholder="Search Projects..." onChange={(e) => { setSearchTerm(e.target.value) }} />
                    <FontAwesomeIcon style={{ position: "absolute", left: "12px", top: "12px" }} icon={faMagnifyingGlass} />
                </Box>
                { hasWalletConnected ? (
                    <Button maxW="135px" onClick={onOpenWalletModal} padding="4px" borderRadius="6px">
                        <Image src={walletInfo.icon} alt={"Wallet Icon"} width="30" height="30" />
                        <Text truncate fontWeight="bold" fontSize="20px">{ userAccount }</Text>
                    </Button>
                ) : (
                    <Button onClick={onOpenWalletModal} padding="4px" borderRadius="6px">
                        Connect Wallet
                    </Button>
                )}
                
                <Button disabled={!hasWalletConnected} onClick={onOpenCreateModal} padding="4px" borderRadius="6px">
                    Create Campaign
                </Button>
            </Flex>
        </Flex>
    )
}