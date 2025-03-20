# DeFi Crowdfunding App

This is a decentralized crowdfunding application built on Ethereum using Solidity for smart contracts and Next.js for the frontend.

## Features

The application supports the following operations:

1. **Create Campaign**: Users can create a new crowdfunding campaign by providing details such as name, description, image URL, deadline, and target amount.
2. **View Campaigns**: A list of all active campaigns is displayed on the `/home` route.
3. **View Campaign Details**: Clicking on a campaign from the list navigates to `/campaign/{campaignId}`, where users can view detailed information about the campaign, including donors and the amount raised.
4. **Donate to Campaign**: Users can donate Ether to a campaign directly from the campaign details page.
5. **Update Campaign**: Campaign owners can update specific fields of their campaigns (e.g., name, description, image).
6. **Delete Campaign**: Campaign owners can delete their campaigns.
7. **View Donors**: Users can view the list of donors for a specific campaign.

## Routes

### `/home`
- Displays a list of all active campaigns.
- Each campaign card includes the name, image, description, and progress towards the funding goal.
- Clicking on a campaign navigates to its details page.

### `/campaign/{campaignId}`
- Displays detailed information about a specific campaign, including:
  - Campaign name, description, image, and deadline.
  - Total amount raised and the list of donors.
- Allows users to donate Ether to the campaign.

## Smart Contract

The smart contract is written in Solidity and includes the following key functions:
- `createCampaigns`: Create a new campaign.
- `getCampaigns`: Retrieve all campaigns.
- `getCampaignDetails`: Retrieve details of a specific campaign.
- `donateToCampaign`: Donate Ether to a campaign.
- `updateCampaigns`: Update specific fields of a campaign.
- `deleteCampaigns`: Delete a campaign.
- `getDonors`: Retrieve the list of donors for a campaign.

## Getting Started

### Prerequisites
- Node.js
- Hardhat (for smart contract development)
- MetaMask (for interacting with the blockchain)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/defi-crowdfunding.git
   cd defi-crowdfunding
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile the smart contract:
   ```bash
   npx hardhat compile
   ```

4. Deploy the smart contract:
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Learn More

To learn more about the technologies used in this project:
- [Solidity Documentation](https://soliditylang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Hardhat Documentation](https://hardhat.org/docs)
