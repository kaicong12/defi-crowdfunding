"use client";

import { Campaign } from "./types";
import { 
    Box, 
    Flex, 
    Input, 
    Button, 
    Text, 
    useDisclosure,
} from "@chakra-ui/react";
import { CampaignCard } from "./CampaignCard";
import { useCallback, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useDebounce } from "@/hooks/useDebounce";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks"
import Image from 'next/image'


import { WalletModal } from "@/components/ui/WalletModal";

export const CampaignList = ({ campaigns }: { campaigns: Campaign[] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { open: isWalletModalOpen, onOpen: onOpenWalletModal, onClose: onCloseWalletModal } = useDisclosure();
    const wallet = useAppSelector(state => state.wallet);
    const { walletInfo, address: userAccount } = wallet;

    const handleCreateCampaign = useCallback(() => {
        console.log("open up create campaign module")
    }, [])

    const filteredCampaigns = useMemo(() => {
        return campaigns.filter((campaign) => debouncedSearchTerm ? campaign.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) : true)
    }, [debouncedSearchTerm, campaigns])

    const hasWalletConnected = !!(walletInfo && userAccount)

    return (
        <Box p="30px" w="100vw">
            <Flex mb="30px" color="black" justifyContent="space-between" alignItems="center">
                <Box flex="1" fontSize="24px" fontWeight="bold">All Campaigns</Box>
                <Flex flex="2" gap="12px" justifyContent="flex-end">
                    <Box width="60%" position="relative">
                        <Input p="4px 8px 4px 40px" onChange={(e) => { setSearchTerm(e.target.value) }} />
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
                    
                    <Button disabled={!hasWalletConnected} onClick={handleCreateCampaign} padding="4px" borderRadius="6px">
                        Create Campaign
                    </Button>
                </Flex>
            </Flex>
            <Flex gap="20px" flexWrap="wrap">
                {filteredCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </Flex>

            <WalletModal isOpen={isWalletModalOpen} onClose={onCloseWalletModal} />
        </Box>
    );
}