import { CampaingDetails } from "./CampaignDetails";

const getCampaign = async (campaignId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        "id": 4,
        "name": "Clean Water Initiative",
        "image": "https://tse2.mm.bing.net/th/id/OIP.aGL2rxhOJ_3yFSHyDm1GQgHaHa?w=186&h=186&c=7&r=0&o=5&dpr=2&pid=1.7",
        "owner": "0x1111222233334444555566667777888899990000",
        "description": "Help build clean water wells in remote communities.",
        "deadline": 1726377600,
        "donatedAmount": 4.2,
        "amount": 6,
        "donors": [
            "0xabcdefabcdefabcdefabcdefabcdefabcdef",
            "0x9876543210abcdef9876543210abcdef98765432"
        ]
    }
}

const Page = async ({ params }: { params: Promise<{ campaignId: string }> }) => {
    const { campaignId } = await params;
    const campaignDetails = await getCampaign(campaignId);

    return <CampaingDetails campaign={campaignDetails} />
}

export default Page;