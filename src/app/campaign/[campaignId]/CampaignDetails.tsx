"use client";
import { Campaign } from "@/app/types";
import { Box, Heading, VStack, Text, Image, Stack, Button, HStack, Progress } from '@chakra-ui/react';

export const CampaingDetails = ({ campaign }: { campaign: Campaign }) => {
    const { image, name, description, deadline, donatedAmount, amount } = campaign;
    const donationProgress = (donatedAmount / amount) * 100;

    return (
        <Box maxW="4xl" mx="auto" p={6} color="black">
            <Stack direction={{ base: 'column', md: 'row' }} align="flex-start">
                <Image src={image} alt={name} borderRadius="md" boxSize={{ base: '100%', md: '400px' }} />
                <VStack align="flex-start" flex="1">
                    <Heading as="h1" size="xl" fontWeight="bold">{name}</Heading>
                    <Text fontSize="lg" color="gray.600">{description}</Text>

                    <Progress.Root value={donationProgress} width="100%">
                        <HStack>
                            <Progress.Track flex="1">
                                <Progress.Range />
                            </Progress.Track>
                            <Progress.ValueText>
                                <Text fontWeight="semibold" fontSize="sm">
                                    {donatedAmount} / {amount} ETH
                                </Text>
                            </Progress.ValueText>
                        </HStack>
                    </Progress.Root>

                    <HStack justify="flex-start" width="100%">
                        <Button variant="outline" colorScheme="blue" flex="1">Share</Button>
                        <Button colorScheme="green" flex="1">Donate Now</Button>
                    </HStack>

                    <HStack justify="space-between" width="100%">
                        <Text fontSize="md">Funds Raised: <strong>{donatedAmount} ETH</strong></Text>
                        <Text fontSize="md">Goal: <strong>{amount} ETH</strong></Text>
                    </HStack>
                </VStack>
            </Stack>
        </Box>
    );
}