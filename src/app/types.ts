export interface Campaign {
    id: number;
    name: string;
    description: string;
    amount: number;
    donatedAmount: number;
    image: string;
    owner: string;
    deadline: number;
    donors: string[];
}

export const campaignFields = [
    "id",
    "name",
    "image",
    "owner",
    "description",
    "deadline",
    "donatedAmount",
    "amount",
    "donors"
]