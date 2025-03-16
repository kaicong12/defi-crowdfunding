"use client";

import { Campaign } from "./types";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { CampaignCard } from "./CampaignCard";
import { useCallback, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useDebounce } from "@/hooks/useDebounce";
import { useMemo } from "react";

export const CampaignList = ({ campaigns }: { campaigns: Campaign[] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const handleCreateCampaign = useCallback(() => {
        console.log("open up create campaign module")
    }, [])

    const filteredCampaigns = useMemo(() => {
        return campaigns.filter((campaign) => debouncedSearchTerm ? campaign.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) : true)
    }, [debouncedSearchTerm, campaigns])

    return (
        <Box p="30px" w="100vw">
            <Flex mb="30px" color="black" justifyContent="space-between" alignItems="center">
                <Box flex="1" fontSize="24px" fontWeight="bold">All Campaigns</Box>
                <Flex flex="2" gap="12px" width="100%" justifyContent="flex-end">
                    <Box width="60%" position="relative">
                        <Input p="4px 8px 4px 40px" onChange={(e) => { setSearchTerm(e.target.value) }} />
                        <FontAwesomeIcon style={{ position: "absolute", left: "12px", top: "12px" }} icon={faMagnifyingGlass} />
                    </Box>
                    <Button onClick={handleCreateCampaign} padding="4px" borderRadius="6px">
                        Create Campaign
                    </Button>
                </Flex>
            </Flex>
            <Flex gap="20px" flexWrap="wrap">
                {filteredCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </Flex>
        </Box>
    );
}