"use client";

import { CampaingDetails } from "./CampaignDetails";
import { useState, useEffect, useCallback } from "react";
import { Campaign } from "@/app/types";
import { ethers } from "ethers";
import { useAppSelector } from "@/lib/hooks";


const Page = ({ params }: { params: { campaignId: string } }) => {
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const wallet = useAppSelector(state => state.wallet);
    const { provider, deployedAddress, contractABI } = wallet;

    const getCampaign = useCallback(async (campaignId: string): Promise<Campaign> => {
        if (!provider || !deployedAddress || !contractABI) {
            throw new Error("Wallet not properly initialized");
        }

        const signer = await provider.getSigner();
        const contract = new ethers.Contract(deployedAddress, contractABI, signer);
        const campaignData = await contract.getCampaignDetails(campaignId);

        // Convert the contract response to our Campaign type
        // Adjust these field mappings based on your actual contract return structure
        return {
            id: Number(campaignData[0]),
            name: campaignData[1],
            image: campaignData[2],
            owner: campaignData[3],
            description: campaignData[4],
            deadline: Number(campaignData[5]),
            donatedAmount: Number(ethers.formatEther(campaignData[6])),
            amount: Number(ethers.formatEther(campaignData[7])),
            donors: campaignData[8]
        };
    }, [contractABI, deployedAddress, provider]);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                setLoading(true);
                const campaignData = await getCampaign(params.campaignId);
                setCampaign(campaignData);
            } catch (error) {
                console.error("Error fetching campaign:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [getCampaign, params.campaignId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!campaign) {
        return <div>Campaign not found</div>;
    }

    return <CampaingDetails campaign={campaign} />
}

export default Page;