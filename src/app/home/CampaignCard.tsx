"use client";

import Image from 'next/image'
import { Campaign } from "../types"
import { Box, Flex, Text } from "@chakra-ui/react"
import { EthereumIcon } from './EthereumIcon'
import React from "react";
import { useRouter } from 'next/navigation'

export const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
    const { name: campaignName, description, amount, image, deadline } = campaign;
    const [highlighted, setHighlighted] = React.useState(false);
    const router = useRouter();

    const handleOnSelectCampaign = React.useCallback(() => {
        const { id: campaignId } = campaign;
        console.log({ campaign, campaignId })
        router.push(`/campaign/${campaignId}`)
    },[campaign, router])

    return (
        <Flex 
            onMouseEnter={() => setHighlighted(true)} 
            onMouseLeave={() => setHighlighted(false)}
            w="300px" 
            color="black" 
            bg="white" 
            borderRadius="12px" 
            flexDir="column"
            _hover={{ background: "#E0E0E0" }}
            onClick={handleOnSelectCampaign}
        >
            <Box height="200px">
                <Image 
                    src={image} 
                    alt="Campaign Image"
                    width={300}
                    height={200}
                    objectFit="cover"
                    style={{ height: "200px", borderRadius: "12px 12px 0 0" }}
                />
            </Box>
            

            <Flex p="20px" flexDirection="column" justifyContent="space-between" h="100%">
                <Box>
                    <Text 
                        lineClamp="2" 
                        fontWeight="bold" 
                        fontSize="20px"
                        textDecoration={highlighted ? "underline" : "none"}
                    >
                        {campaignName}
                    </Text>
                    <Text lineClamp="2" color="gray" fontSize="14px" py="6px">{description}</Text>
                </Box>

                <Flex justifyContent="space-between" alignItems="center">
                    <Text>{new Date(deadline * 1000).toLocaleDateString()}</Text>
                    <Box border="1px solid gray" borderRadius="12px" p="6px" display="flex" alignItems="center">
                        <EthereumIcon width="20px" height="20px" />
                        <Text ml="4px">{amount} ETH</Text>
                    </Box>
                </Flex>
            </Flex>
        </Flex>    
    )
}