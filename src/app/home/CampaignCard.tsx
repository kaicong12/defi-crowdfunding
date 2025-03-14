import Image from 'next/image'
import { Campaign } from "./types"
import { Box, Flex, Text } from "@chakra-ui/react"
import { EthereumIcon } from './EthereumIcon'

export const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
    const { name: campaignName, description, amount, image, deadline } = campaign;

    return (
        <Flex w="300px" color="black" bg="white" borderRadius="12px" flexDir="column">
            <Image 
                src={image} 
                alt="Campaign Image"
                width={300}
                height={200}
                style={{ height: "200px", objectFit: "cover", borderRadius: "12px 12px 0 0" }}
            />

            <Flex p="20px" flexDirection="column" justifyContent="space-between" h="100%">
                <Box>
                    <Text lineClamp="2" fontWeight="bold" fontSize="20px">{campaignName}</Text>
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