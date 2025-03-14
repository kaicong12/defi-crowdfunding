"use client";

import { Campaign } from "./types";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { CampaignCard } from "./CampaignCard";
import { useCallback, useState } from "react";

export const CampaignList = ({ campaigns }: { campaigns: Campaign[] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleCreateCampaign = useCallback(() => {
        console.log("open up create campaign module")
    }, [])

    return (
        <Box p="30px">
            <Flex mb="30px" color="black" justifyContent="space-between" alignItems="center">
                <Box fontSize="24px" fontWeight="bold">Campaigns</Box>
                <Flex gap="12px" width="100%" justifyContent="flex-end">
                    <Input onChange={(e) => { setSearchTerm(e.target.value) }} width="60%" />
                    <Button onClick={handleCreateCampaign} padding="4px" borderRadius="6px">
                        Create Campaign
                    </Button>
                </Flex>
            </Flex>
            <Flex gap="20px" flexWrap="wrap">
                {campaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </Flex>
        </Box>
    );
}