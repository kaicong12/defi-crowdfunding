import { Campaign } from "@/app/types";
import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react';
import { DonationCard } from "./DonateCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch, faShieldHalved } from '@fortawesome/free-solid-svg-icons'

export const CampaingDetails = ({ campaign }: { campaign: Campaign }) => {
    const { image, name, description, deadline, donatedAmount, amount } = campaign;
    const deadlineDate = new Date(deadline * 1000);
    const currentDate = new Date();
    // Calculate the difference in time (milliseconds)
    const timeDifference = deadlineDate - currentDate;
    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return (
        <Box mx="auto" p="32px 48px" color="black" position="absolute" width="100%">
            <Heading as="h1" fontSize="32px" fontWeight="bold" my="24px">{name}</Heading>
            <Flex justifyContent="space-between">
                <Box flex="2">
                    <Image src={image} alt={name} borderRadius="md" boxSize={{ base: '100%' }} maxH="500px" />

                    <Box
                        mt={4}
                        py={3}
                        borderTop="1px solid #c0bdb8"
                        borderBottom="1px solid #c0bdb8"
                        display="flex"
                        gap="8px"
                    >
                        <Flex 
                            color="#015d32"
                            alignItems="center" 
                            gap="6px" 
                            borderRadius="12px" 
                            background="#cef3bd" 
                            border="1px solid rgb(0, 135, 72)"
                            p="4px 12px"
                            flexGrow={0}
                        >
                            <FontAwesomeIcon height="14px" icon={faStopwatch} />
                            <Text fontWeight="bold" fontSize="14px">{daysLeft} days left</Text>
                        </Flex>

                        <Flex 
                            color="#015d32"
                            alignItems="center" 
                            gap="6px" 
                            borderRadius="12px" 
                            background="#cef3bd" 
                            border="1px solid rgb(0, 135, 72)"
                            p="4px 12px"
                            flexGrow={0}
                        >
                            <FontAwesomeIcon height="14px" icon={faShieldHalved} />
                            <Text fontWeight="bold" fontSize="14px">Donation protected</Text>
                        </Flex>
                    </Box>

                    <Text mt={5} fontSize="16px">{description}</Text>
                </Box>
                <Box flex="1" position="sticky" top="0" ml={6}>
                    <DonationCard donatedAmount={donatedAmount} amount={amount} />
                </Box>
                
            </Flex>
        </Box>
    );
}