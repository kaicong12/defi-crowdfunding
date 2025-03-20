"use client";

import { useCallback, useState } from "react";
import { 
    Box, 
    Dialog, 
    Portal, 
    VStack, 
    Text, 
    Button, 
    Input, 
    Textarea, 
    HStack,
    Field,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useAppSelector } from "@/lib/hooks";
import { toaster } from "@/components/ui/toaster"

type InputErrors = { [name: string]: string }

export const CreateCampaignModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [campaignName, setCampaignName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [amount, setAmount] = useState("");
    const { address: userAccount } = useAppSelector(state => state.wallet);
    const [errors, setErrors] = useState<InputErrors>({
        campaignName: "",
        imageUrl: "",
        description: "",
        deadline: "",
        amount: "",
    });

    const validateInput = useCallback(() => {
        const newErrors: InputErrors = {};

        if (!campaignName) {
            newErrors.campaignName = "Campaign name is required.";
        }

        if (!imageUrl) {
            newErrors.imageUrl = "Image URL is required.";
        }

        if (!description) {
            newErrors.description = "Description is required.";
        }

        if (!deadline) {
            newErrors.deadline = "Deadline is required.";
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            newErrors.amount = "Valid amount is required.";
        }

        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some((error: string) => error.length > 0);
        return hasErrors;
    }, [amount, campaignName, deadline, description, imageUrl])

    const handleCreateCampaign = async () => {
        const hasErrors = validateInput();
        if (!userAccount) {
            toaster.create({
                title: "Wallet not connected",
                description: "Please connect your wallet to create a campaign.",
                type: "error",
            });
            return;
        }
        
        if (hasErrors) {
            toaster.create({
                title: "Invalid input",
                description: "Please fill in all fields to create a campaign.",
                type: "error",
            });
            return;
        }

        const deadlineUnix = new Date(deadline).getTime() / 1000;
        const amountInWei = ethers.utils.parseEther(amount);

        try {
            const contract = await getCampaignContract();
            const tx = await contract.createCampaigns(
                campaignName,
                imageUrl,
                userAccount,
                description,
                deadlineUnix,
                amountInWei
            );

            await tx.wait();
            // toaster.create({
            //     title: "Campaign Created",
            //     description: "Your campaign has been successfully created.",
            //     status: "success",
            //     duration: 5000,
            //     isClosable: true,
            // });

            onClose(); // close the modal after successful creation
        } catch (error) {
            // toaster.create({
            //     title: "Transaction failed",
            //     description: "There was an error creating your campaign. Please try again.",
            //     status: "error",
            //     duration: 5000,
            //     isClosable: true,
            // });
        }
    };

    const getCampaignContract = async () => {
        // Assuming you have a method to get the contract, for example:
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "YOUR_CONTRACT_ADDRESS"; // replace with your contract address
        const contractABI = [ /* your contract ABI */ ];

        return new ethers.Contract(contractAddress, contractABI, signer);
    };

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        switch (name) {
            case "campaignName":
                setCampaignName(value);
                setErrors((prev) => ({ ...prev, campaignName: value ? "" : "Campaign name is required" }));
                break;
            case "imageUrl":
                setImageUrl(value);
                setErrors((prev) => ({ ...prev, imageUrl: value ? "" : "Image URL is required" }));
                break;
            case "description":
                setDescription(value);
                setErrors((prev) => ({ ...prev, description: value ? "" : "Description is required" }));
                break;
            case "deadline":
                setDeadline(value);
                setErrors((prev) => ({ ...prev, deadline: value ? "" : "Deadline is required" }));
                break;
            case "amount":
                setAmount(value);
                setErrors((prev) => ({ ...prev, amount: value ? "" : "Amount is required" }));
                break;
            default:
                break;
        }
    }, [])
    
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose} placement={"center"}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content bg="#2B2B2B" borderRadius="20px">
                        <Dialog.Header>
                            <Box width="100%" padding="15px" mt="12px">
                                <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="white">
                                    Create a Campaign
                                </Text>
                            </Box>
                        </Dialog.Header>
                        <Dialog.Body fontWeight="semibold">
                            <VStack align="stretch" p={6} color="white">
                                <Field.Root mb={4}>
                                    <Field.Label>
                                        <Text fontWeight="bold">Campaign Name</Text>
                                    </Field.Label>
                                    <Input
                                        name="campaignName"
                                        border="1px solid white"
                                        value={campaignName}
                                        onChange={handleInputChange}
                                        placeholder="Enter campaign name"
                                        borderRadius="12px"
                                        padding="15px"
                                        _hover={{ borderColor: "#3182ce" }}
                                    />
                                    { errors.campaignName && <Text fontWeight="normal" color="red">{errors.campaignName}</Text> }
                                </Field.Root>
                                <Field.Root mb={4}>
                                    <Field.Label>
                                        <Text fontWeight="bold">Image URL</Text>
                                    </Field.Label>
                                    <Input
                                        name="imageUrl"
                                        border="1px solid white"
                                        value={imageUrl}
                                        onChange={handleInputChange}
                                        placeholder="Enter campaign image URL"
                                        borderRadius="12px"
                                        padding="15px"
                                        _hover={{ borderColor: "#3182ce" }}
                                    />
                                    { errors.imageUrl && <Text fontWeight="normal" color="red">{errors.imageUrl}</Text> }
                                </Field.Root>

                                <Field.Root mb={4}>
                                    <Field.Label>
                                        <Text fontWeight="bold">Description</Text>
                                    </Field.Label>
                                    <Textarea
                                        name="description"
                                        border="1px solid white"
                                        value={description}
                                        onChange={handleInputChange}
                                        placeholder="Enter campaign description"
                                        borderRadius="12px"
                                        padding="15px"
                                        _hover={{ borderColor: "#3182ce" }}
                                    />
                                    { errors.description && <Text fontWeight="normal" color="red">{errors.description}</Text> }
                                    
                                </Field.Root>
                                <Field.Root mb={4}>
                                    <Field.Label>
                                        <Text fontWeight="bold">Deadline</Text>
                                    </Field.Label>
                                    <Input
                                        name="deadline"
                                        border="1px solid white"
                                        type="datetime-local"
                                        value={deadline}
                                        onChange={handleInputChange}
                                        borderRadius="12px"
                                        padding="15px"
                                        _hover={{ borderColor: "#3182ce" }}
                                    />
                                    { errors.deadline && <Text fontWeight="normal" color="red">{errors.deadline}</Text> }
                                </Field.Root>

                                <Field.Root mb={4}>
                                    <Field.Label>
                                        <Text fontWeight="bold">Total Amount Needed (ETH)</Text>
                                    </Field.Label>

                                    <Input
                                        name="amount"
                                        border="1px solid white"
                                        type="number"
                                        value={amount}
                                        onChange={handleInputChange}
                                        borderRadius="12px"
                                        padding="15px"
                                        placeholder="Enter amount in ETH"
                                        _hover={{ borderColor: "#3182ce" }}
                                    />
                                    { errors.amount && <Text fontWeight="normal" color="red">{errors.amount}</Text> }
                                </Field.Root>
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer>
                        <HStack width="100%" justify="center" padding="15px" mb="15px">
                            <Button
                                variant="outline"
                                colorScheme="red"
                                onClick={onClose}
                                width="45%"
                                borderRadius="12px"
                                padding="15px"
                                border="1px solid white"
                                _hover={{ bg: "red.600", color: "white", borderColor: "red" }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateCampaign}
                                width="45%"
                                borderRadius="12px"
                                _hover={{ backgroundColor: "#404040" }}
                                padding="15px"
                            >
                                Create Campaign
                            </Button>
                        </HStack>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}