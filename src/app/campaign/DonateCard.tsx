import { 
    Box, 
    Button,
    Flex,
    Heading, 
    HStack,
    Progress, 
    Stack, 
    Text 
} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'

export const DonationCard = ({ donatedAmount, amount }: { donatedAmount: number, amount: number }) => {
  const percentageRaised = (donatedAmount / amount) * 100;
  const donors = [
    { name: "Anonymous", amount: 10000 },
    { name: "Anonymous", amount: 10000 },
    { name: "Anonymous", amount: 500}
  ]

  return (
    <Box
      width="300px"
      padding="32px 24px"
      borderRadius="lg"
      boxShadow="md"
    >
        <Heading fontSize="26px">{donatedAmount} (ETH) raised</Heading>
        <Text fontSize="sm" color="gray.500">
            of {amount} (ETH) goal
        </Text>

        <Progress.Root value={percentageRaised} width="100%" mt="12px">
            <HStack>
                <Progress.Track flex="1">
                    <Progress.Range />
                </Progress.Track>
                <Progress.ValueText>
                    <Text fontWeight="semibold" fontSize="sm">
                        {percentageRaised}%
                    </Text>
                </Progress.ValueText>
            </HStack>
        </Progress.Root>

        <Stack mt="32px" gap="12px">
            <Button 
                fontWeight="bold" 
                bg="#f3bc51" 
                color="black" 
                borderRadius="6px" 
                _hover={{ background: "linear-gradient(180deg, #f9db74, #f3bc51)" }}
            >
                Share
            </Button>
            <Button 
                fontWeight="bold" 
                bg="#f3bc51" 
                color="black" 
                borderRadius="6px" 
                _hover={{ background: "linear-gradient(180deg, #f9db74, #f3bc51)" }}
            >
                Donate Now
            </Button>
        </Stack>

        <Stack width="full" mt="24px">
            <Flex gap="12px" mb="12px">
                <FontAwesomeIcon height="20px" icon={faHandHoldingDollar} />
                <Text fontSize="16px" color="gray.600" fontWeight="semibold">
                    709 people just donated
                </Text>
            </Flex>
            {donors.map((donor, index) => {
                return (
                    <Flex key={index} justifyContent="space-between">
                        <Text fontSize="14px">{donor.name}</Text>
                        <Text fontWeight="semibold" fontSize="14px">{donor.amount} ETH</Text>
                    </Flex>
                )
            })}
        </Stack>
    </Box>
  );
};
