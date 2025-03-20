export interface Campaign {
    id: number;
    name: string;
    description: string;
    amount: number;
    donatedAmount: number;
    image: string;
    owner: string;
    deadline: number;
}