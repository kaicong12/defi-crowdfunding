"use client";

import { 
    Box,
    Flex, 
    useDisclosure,
} from "@chakra-ui/react";
import { CampaignCard } from "./CampaignCard";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useMemo } from "react";

import { Campaign } from "../types";
import { TopBar } from "./TopBar";
import { WalletModal } from "@/components/ui/WalletModal";
import { CreateCampaignModal } from "@/components/ui/CreateCampaign";


export const CampaignList = ({ campaigns }: { campaigns: Campaign[] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { open: isWalletModalOpen, onOpen: onOpenWalletModal, onClose: onCloseWalletModal } = useDisclosure();
    const { open: isCreateModalOpen, onOpen: onOpenCreateModal, onClose: onCloseCreateModal } = useDisclosure();

    const filteredCampaigns = useMemo(() => {
        return campaigns.filter((campaign) => debouncedSearchTerm ? campaign.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) : true)
    }, [debouncedSearchTerm, campaigns])

    return (
        <Box p="30px" w="100vw">
            <TopBar 
                setSearchTerm={setSearchTerm} 
                onOpenWalletModal={onOpenWalletModal}
                onOpenCreateModal={onOpenCreateModal}
            />
            <Flex gap="20px" flexWrap="wrap">
                {filteredCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </Flex>

            <WalletModal isOpen={isWalletModalOpen} onClose={onCloseWalletModal} />
            <CreateCampaignModal isOpen={isCreateModalOpen} onClose={onCloseCreateModal} />
        </Box>
    );
}