"use client";

import { CampaignList } from "./CampaignList";

import { ethers } from "ethers"
import { useAppSelector } from "@/lib/hooks"
import { useCallback, useEffect, useState } from "react";
import { Campaign, campaignFields } from "../types";


const Page = () => {
    const wallet = useAppSelector(state => state.wallet);
    const { provider, deployedAddress, contractABI } = wallet;
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    const getCampaigns = useCallback(async () => {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(deployedAddress, contractABI, signer);
        const result = await contract.getCampaigns();
        const convertedResults = result.map((campaign: any[]) => {
            const convertedCampaign: { [key: string]: any } = {};
            campaignFields.forEach((field, index) => {
                let value = campaign[index];
                if (field === "deadline") {
                    value = Number(value);
                }
                convertedCampaign[field] = value;
            });
            return convertedCampaign as Campaign;
        });
        setCampaigns(convertedResults)
    }, [provider, deployedAddress, contractABI]);

    useEffect(() => {
        getCampaigns();
    }, [getCampaigns]);

    
    return <CampaignList campaigns={campaigns} />;
}

export default Page;