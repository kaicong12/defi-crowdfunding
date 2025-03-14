import campaignList from "@/data/campaignList";
import { CampaignList } from "./CampaignList";

const Page = () => {
    // offload data fetching to the backend by making this a server side component
    const campaigns = campaignList;
    return <CampaignList campaigns={campaigns} />;
}

export default Page;